import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';

import { WebSocketHandler } from '../ws';
import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster } from '../../models';

export class PhaseOneService {
    private dispatch: any;
    private handler: WebSocketHandler;
    private precincts: Map<string, IPrecinct>;
    private phaseOneArgs: PhaseOneArgs;
    private districts: Map<string, ICluster>;

    constructor(precinctMap: Map<string, IPrecinct>, dispatch: any, districts: Map<string, ICluster>, phaseOneArgs: PhaseOneArgs) {
        this.precincts = precinctMap;
        this.dispatch = dispatch;
        this.precincts = precinctMap;
        this.phaseOneArgs = phaseOneArgs;
        this.districts = districts;
        this.handler = new WebSocketHandler(
            this.generateUrl(),
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        )
    }
    
    private generateUrl(): string {
        return `${Constants.APP_API_WS}/ws/algorithms/phase1`;
    }

    private onOpen(): void {
        
    }

    private onMessage(event: any): void {
        if (this.phaseOneArgs.intermediateResults) {

        } else {
            // Assign the new district ID to each precinct (this is the final one)
            const changedNodes: Map<string, string> = event.data.changedNodes;
            const newDistricts: Map<string, ICluster> = event.data.newDistricts; // Note: any could be converted to ICluster
            changedNodes.forEach((districtId: string, precinctId: string) => {
                this.precincts.get(precinctId).newCdId = districtId;
            });
            this.dispatch(mapActionCreators.setPrecinctMap);

            // Update the final map with the new district IDs in newDistricts
            newDistricts.forEach((districtObject: ICluster, districtId: string) => {
                this.
            });
        }
    }

    private onClose(): void {
        mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2);
    }
}
