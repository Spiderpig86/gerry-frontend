import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';

import { WebSocketHandler } from '../ws';
import { IPrecinct, AlgorithmEnum, PhaseOneArgs } from '../../models';

export class PhaseOneService {
    private dispatch: any;
    private handler: WebSocketHandler;
    private precinctMap: Map<string, IPrecinct>;
    private phaseOneArgs: PhaseOneArgs;

    constructor(precinctMap: Map<string, IPrecinct>, dispatch: any, phaseOneArgs: PhaseOneArgs) {
        this.precinctMap = precinctMap;
        this.dispatch = dispatch;
        this.phaseOneArgs = phaseOneArgs;
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

        }
    }

    private onClose(): void {
        mapActionCreators.setAlgorithmPhase(AlgorithmEnum.PHASE_2);
    }
}
