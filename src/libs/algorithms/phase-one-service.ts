import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';
import Axios from 'axios';

import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster, WebSocketPing, ResponseEnum, ElectionEnum } from '../../models';
import { formatResponse } from '../functions/response';
import { StompClient } from '../stomp';
import { ModelMapper } from '../mapping/model-mapper';
import { store } from '../../index';

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
    }

    private generateUrl(): string {
        // return `wss://echo.websocket.org`;
        return `http://localhost:8080/algorithm-sockets`;
    }

    private getPath() {
        return `/user/queue/reports/phase1`;
    }

    private onOpen(): void {
        console.info('Phase 1 Stomp connected!');
    }

    private onMessage(response: any): void {
        const data = JSON.parse(response.body);

        const jobId = data.jobId;
        // const.logs = data.logs;
        if (jobId !== store.getState().stateReducer.phaseOneArgs.jobId) {
            // This is a new job, clear new clusters
            console.log('woweowoewoeowoewoow', jobId);
            this.districts.clear();
            this.dispatch(mapActionCreators.setPhaseOneJobId(jobId));
        }

        const info = data.deltas[0];
        // const iteration = info.iteration;
        const newDistricts: any[] = Object.values(info.newDistricts);
        const changes: any[] = Object.entries(info.changedNodes);

        // For each changed nodes, if the node's key is different than the new node's value, delete the old cluster
        for (const change of changes) {
            if (change[0] !== change[1]) {
                this.districts.delete(change[0]);
            }
        }

        // Transform and populate map
        for (const district of newDistricts) {
            const key = district.numericalId;
            const cluster: ICluster = {
                numericalId: district.numericalId,
                name: `d${district.numericalId}`,
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
        }


        // Update the final map with the new district IDs in newDistricts
        this.districts.forEach((districtObject: ICluster, districtId: string) => {
            districtObject.precinctNames.forEach(precinctId => {
                this.precincts.get(precinctId).newCdId = Number(districtId);
            });
        });
        
        // On final iteration
        console.log(data, this.districts);
        
        if (data.statusCode === 'success') {
            this.dispatch(mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2));

            // Re-color to improve contrast
            let districtId = 1;
            const finalDistricts = new Map<string, ICluster>();
            this.districts.forEach((cluster: ICluster) => {
                cluster.precinctNames.forEach(precinctId => {
                    this.precincts.get(precinctId).newCdId = Number(districtId);
                    
                });
                cluster.name = `d${districtId.toString()}`;
                cluster.numericalId = districtId.toString();
                finalDistricts.set(districtId.toString(), cluster);
                districtId++;
            });
            this.districts = finalDistricts;
            console.log(this.districts);
            
        }
        this.dispatch(mapActionCreators.setPrecinctMap(this.precincts));
        this.dispatch(mapActionCreators.setNewClusters(this.districts));
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
