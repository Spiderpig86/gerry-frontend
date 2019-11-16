import * as stateReducer from '../redux/modules/state/state';
import * as Constants from '../config/constants';

import { WebSocketHandler } from './ws';
import { StateEnum, IPrecinct } from '../models';
import { hashPrecinct } from './functions/hash';

export class PrecinctService {
    private dispatch: any;
    private handler: WebSocketHandler;
    private precincts: any;
    private precinctMap: Map<string, IPrecinct>;

    constructor(state: StateEnum, dispatch: any) {
        this.dispatch = dispatch;
        this.handler = new WebSocketHandler(
            this.generateUrl(state),
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        );
        this.precincts = Constants.EMPTY_PRECINCTS;
        this.precinctMap = new Map<string, IPrecinct>();
    }

    private generateUrl(state: StateEnum): string {
        return `ws://localhost:9001/${state}`;
    }

    private onOpen(): void {
        this.precincts = Object.assign({}, Constants.EMPTY_PRECINCTS);
    }

    private onMessage(event: any): void {
        const message = JSON.parse(event.data);
        this.precincts.features = this.precincts.features.concat(message);
        message.forEach(shape => {
            this.precinctMap.set(hashPrecinct(shape.properties), {originalCdId: shape.properties.cd, ...shape});
        });
        this.dispatch(stateReducer.setPrecinctData(this.precincts));
    }

    private onClose(): void {
        this.dispatch(stateReducer.setPrecinctMap(this.precinctMap));
    }
}
