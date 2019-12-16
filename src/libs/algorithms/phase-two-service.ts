import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';
import Axios from 'axios';

import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster, WebSocketPing, ResponseEnum, ElectionEnum } from '../../models';
import { formatResponse } from '../functions/response';
import { StompClient } from '../stomp';
import { ModelMapper } from '../mapping/model-mapper';
import { store } from '../../index';

export class PhaseTwoService {
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
            `/algorithm/phase2`,
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
        return `/user/queue/reports/phase2`;
    }

    private onOpen(): void {
        console.info('Phase 2 Stomp connected!');
    }

    private onMessage(response: any): void {
        const data = JSON.parse(response.body);
    }

    private onClose(): void {
        console.log('Closed stomp client');
    }

    public setDispatch(dispatch: any) {
        this.dispatch = dispatch;
    }
}
