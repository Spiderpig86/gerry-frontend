import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';
import Axios from 'axios';

import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster, WebSocketPing, ResponseEnum, ElectionEnum } from '../../models';
import { formatResponse } from '../functions/response';
import { StompClient } from '../stomp';
import { ModelMapper } from '../mapping/model-mapper';

export class PhaseOneService {
    private dispatch: any;
    private handler: StompClient;
    private precincts: Map<string, IPrecinct>;
    private districts: Map<string, ICluster>;

    constructor(precincts: Map<string, IPrecinct>, dispatch: any, districts: Map<string, ICluster>) {
        this.precincts = precincts;
        this.dispatch = dispatch;
        this.districts = districts;
        this.handler = new StompClient(
            this.generateUrl(),
            this.getPath(),
            `/algorithm/phase1`,
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        );
        console.log(this.handler.stompClient)
    }

    private generateUrl(): string {
        // return `wss://echo.websocket.org`;
        return `http://localhost:8080/algorithm-sockets`;
    }

    private getPath() {
        return `/user/queue/reports/phase1`;
    }

    private onOpen(): void {
        console.info('Phase 1 stomp connected!');
    }

    private onMessage(response: any): void {
        const data = JSON.parse(response.body);

        const jobId = data.jobId;
        const info = data.deltas[0];
        const iteration = info.iteration;
        const newDistricts: any[] = Object.values(info.newDistricts);

        // Transform and populate map
        for (const district of newDistricts) {
            const key = district.numericalId;
            const cluster: ICluster = {
                numericalId: district.id,
                objectiveFunctionScores: null,
                precinctNames: new Set<string>(district.precinctNames),
                demographicData: {
                    ...district.demographicData,
                    population: ModelMapper.toIDemographic(district.demographicData.population)
                },
                electionData: this.getElection(district.electionData),
                isMajorityMinority: district.majMin
            };

            this.districts.set(key, cluster);

            

            if (data.statusCode === 'success') {
                this.dispatch(mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2));
            }
        }


        // Update the final map with the new district IDs in newDistricts
        this.districts.forEach((districtObject: ICluster, districtId: string) => {
            districtObject.precinctNames.forEach(precinctId => {
                this.precincts.get(precinctId).newCdId = Number(districtId);
            });
        });
        this.dispatch(mapActionCreators.setPrecinctMap(this.precincts));
        this.dispatch(mapActionCreators.setNewClusters(this.districts));
        console.log(jobId);
        if (jobId) {
            this.dispatch(mapActionCreators.setPhaseOneJobId(jobId));
        }
    }

    private onClose(): void {
        console.log('Closed stomp client');
        this.dispatch(mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2));
    }

    /**
     * Triggered by hitting the next step button for phase 1
     */
    public fetchNextStep(phaseOneArgs: PhaseOneArgs) {
        const args = {
            ...phaseOneArgs,
            lowerBound: phaseOneArgs.lowerBound / 100,
            upperBound: phaseOneArgs.upperBound / 100,
            demographicTypes: Array.from(phaseOneArgs.demographicTypes)
        };
        this.handler.publish(JSON.stringify(
                args
        ));
    }

    public async runPhaseOne(phaseOneArgs: PhaseOneArgs) {
        // Non-iterative approach
        console.log('run phsae 1');
        
        this.dispatch(mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2)); // TODO: Move when working
        try {
            const response = await Axios.post(`${Constants.APP_API}/algorithm/phase1`, {
                ...phaseOneArgs,
            });
            // return formatResponse(ResponseEnum.OK, this.toPhaseZeroResult(response.data.precinctBlocs));
            return null;
        } catch (e) {
            console.log(e);
            return formatResponse(ResponseEnum.ERROR, null);
        }
    }

    private getElection(electionData: any) {
        switch (electionData.electionType) {
            case ElectionEnum.PRES_16:
                return {
                    presidential16: ModelMapper.toIVote(electionData)
                }
            case ElectionEnum.HOUSE_16:
                return {
                    house16: ModelMapper.toIVote(electionData)
                }
            default:
                return {
                    house18: ModelMapper.toIVote(electionData)
                }
        }
    }

    public setDispatch(dispatch: any) {
        this.dispatch = dispatch;
    }
}
