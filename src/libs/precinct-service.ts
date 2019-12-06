import * as stateReducer from '../redux/modules/state/state';
import * as Constants from '../config/constants';

import { WebSocketHandler } from './ws';
import { StateEnum, IPrecinct } from '../models';
import { hashPrecinct } from './functions/hash';

export class PrecinctService {
    private state: StateEnum;
    private dispatch: any;
    private handler: WebSocketHandler;
    private precincts: any;
    private precinctMap: Map<string, IPrecinct>;

    constructor(state: StateEnum, dispatch: any) {
        this.state = state;
        this.dispatch = dispatch;
        this.handler = new WebSocketHandler(
            this.generateUrl(state),
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        ); 
        this.precincts = Object.assign({}, Constants.EMPTY_PRECINCTS);
        this.precinctMap = new Map<string, IPrecinct>();
    }

    private generateUrl(state: StateEnum): string {
        return `${Constants.APP_API_WS}/${state}`;
    }

    private onOpen(): void {
        this.precincts.features = [];
        this.precinctMap = new Map<string, IPrecinct>();
    }

    private onMessage(event: any): void {
        const message = JSON.parse(event.data);
        // Array.prototype.push.apply(this.precincts.features, message);
        console.log(this.precinctMap.size)
        this.updateStateReducerPrecincts(message);
    }

    private onClose(): void {
        // this.precincts.features = Array.from(this.precinctMap.values());
        // this.dispatch(stateReducer.setPrecinctDataCreator(this.precincts));
        this.dispatch(stateReducer.setPrecinctMap(this.precinctMap));
        this.dispatch(stateReducer.selectState(this.state));
    }

    private updateStateReducerPrecincts(message: any[]): void {
        for (let i = 0; i < message.length; i++) {
            const shape = message[i];
            this.precinctMap.set(hashPrecinct(shape.properties), {originalCdId: shape.properties.cd, ...shape});
        }
    }
}
