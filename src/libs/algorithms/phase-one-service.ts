import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';
import Axios from 'axios';

import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster, WebSocketPing, ResponseEnum } from '../../models';
import { formatResponse } from '../functions/response';
import { StompClient } from '../stomp';

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
            `/algorithm/phase0`,
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
        return `/user/queue/reports/phase0`;
    }

    private onOpen(): void {
        console.info('Phase 1 stomp connected!');
    }

    private onMessage(res: any): void {
        console.log(res);

        // TODO: if the iteration is done in statuscode for report, close the socket

        // Assign the new district ID to each precinct (this is the final one)
        // const data = JSON.parse(frame.body);
        // const changedNodes: Map<string, string> = new Map(Object.entries(data.changedNodes));
        // const newDistricts: Map<string, ICluster> = new Map(Object.entries(data.newDistricts)); // Note: any could be converted to ICluster
        // // changedNodes.forEach((districtId: string, precinctId: string) => {
        // //     if (this.precincts.has(districtId)) {
        // //         this.precincts.get(precinctId).newCdId = districtId;
        // //     }
        // // });

        // // Update the final map with the new district IDs in newDistricts
        // newDistricts.forEach((districtObject: ICluster, districtId: string) => {
        //     districtObject.precinctKeys.forEach(precinctId => {
        //         this.precincts.get(precinctId).newCdId = Number(districtId);
        //     });
        //     this.districts.set(districtId, districtObject);
        // });
        // this.dispatch(mapActionCreators.setPrecinctMap(this.precincts));
        // this.dispatch(mapActionCreators.setNewClusters(this.districts));
    }

    private onClose(): void {
        console.log('Closed stomp client');
        this.dispatch(mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2));
    }

    /**
     * Triggered by hitting the next step button for phase 1
     */
    public fetchNextStep() {
        // this.handler.ws.send(
        //     JSON.stringify({
        //         action: 'REQUEST_NEXT_STEP',
        //         value: null
        //     } as WebSocketPing)
        // );
        // 
        this.handler.publish(JSON.stringify(
            {
                "stateType": "VA",
                "electionType": "house_16",
                "populationThreshold": 0.8,
                "voteThreshold": 0.8
            }
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
}
