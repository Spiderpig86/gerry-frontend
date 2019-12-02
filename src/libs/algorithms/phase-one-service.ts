import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';

import { WebSocketHandler } from '../ws';
import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster, WebSocketPing } from '../../models';

export class PhaseOneService {
    private dispatch: any;
    private handler: WebSocketHandler;
    private precincts: Map<string, IPrecinct>;
    private districts: Map<string, ICluster>;

    constructor(precincts: Map<string, IPrecinct>, dispatch: any, districts: Map<string, ICluster>) {
        this.precincts = precincts;
        this.dispatch = dispatch;
        this.districts = districts;
        this.handler = new WebSocketHandler(
            this.generateUrl(),
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        );
    }
    
    private generateUrl(): string {
        // return `wss://echo.websocket.org`;
        return `${Constants.APP_API_WS}/ws/phase1`;
    }

    private onOpen(): void {
        console.info('Phase 1 WS connected!')
    }

    private onMessage(event: any): void {
        // Assign the new district ID to each precinct (this is the final one)
        const data = JSON.parse(event.data);
        const changedNodes: Map<string, string> = new Map(Object.entries(data.changedNodes));
        const newDistricts: Map<string, ICluster> = new Map(Object.entries(data.newDistricts)); // Note: any could be converted to ICluster
        changedNodes.forEach((districtId: string, precinctId: string) => {
            if (this.precincts.has(districtId)) {
                this.precincts.get(precinctId).newCdId = districtId;
            }
        });
        this.dispatch(mapActionCreators.setPrecinctMap(this.precincts));

        // Update the final map with the new district IDs in newDistricts
        newDistricts.forEach((districtObject: ICluster, districtId: string) => {
            this.districts.set(districtId, districtObject);
        });
        this.dispatch(mapActionCreators.setNewClusters(this.districts));
    }

    private onClose(): void {
        mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2);
    }

    /**
     * Triggered by hitting the next step button for phase 1
     */
    public fetchNextStep() {
        this.handler.ws.send(JSON.stringify({
            action: 'REQUEST_NEXT_STEP',
            value: null
        } as WebSocketPing));
    }
}
