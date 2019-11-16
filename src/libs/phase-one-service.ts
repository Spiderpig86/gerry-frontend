import { WebSocketHandler } from './ws';
import { IPrecinct } from '../models';
import * as Constants from '../config/constants';

export class PhaseOneService {
    private dispatch: any;
    private handler: WebSocketHandler;
    private precinctMap: Map<string, IPrecinct>;

    constructor(precinctMap: Map<string, IPrecinct>, dispatch: any) {
        this.precinctMap = precinctMap;
        this.dispatch = dispatch;
        this.handler = new WebSocketHandler(
            this.generateUrl(),
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        )
    }
    
    private generateUrl(): string {
        return `${Constants.APP_API}/ws/algorithms/phase1`;
    }

    private onOpen(): void {
        
    }

    private onMessage(event: any): void {
        
    }

    private onClose(): void {
        
    }
}
