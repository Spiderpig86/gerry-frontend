import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';
import Axios from 'axios';

import { IPrecinct, AlgorithmEnum, PhaseOneArgs, ICluster, ResponseEnum, ElectionEnum, PhaseTwoArgs, PhaseTwoMeasuresEnum } from '../../models';
import { formatResponse } from '../functions/response';
import { StompClient } from '../stomp';
import { ModelMapper } from '../mapping/model-mapper';
import { store } from '../../index';

export class PhaseTwoService {
    private dispatch: any;
    private handler: StompClient;
    private precincts: Map<string, IPrecinct>;
    private districts: Map<string, ICluster>;
    private phaseTwoArgs: PhaseTwoArgs;

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
        console.log(response);
        
    }

    private onClose(): void {
        console.log('Closed stomp client');
    }

    public fetchNextStep(phaseTwoArgs: PhaseTwoArgs) {
        console.log(phaseTwoArgs);
        
        this.phaseTwoArgs = phaseTwoArgs;
        const args = {
            jobId: phaseTwoArgs.jobId,
            stateType: phaseTwoArgs.stateType,
            electionType: phaseTwoArgs.electionData,
            demographicTypes: Array.from(phaseTwoArgs.demographicTypes),
            lowerBound: phaseTwoArgs.lowerBound / 100,
            upperBound: phaseTwoArgs.upperBound / 100,
            numRetries: phaseTwoArgs.numRetries,
            depthHeuristic: phaseTwoArgs.phaseTwoDepthHeuristic,
            moveHeuristic: phaseTwoArgs.precinctMoveHeuristic,
            epsilon: phaseTwoArgs.epsilon,
            ...this.convertWeights(phaseTwoArgs, phaseTwoArgs.weights),
        };
        this.handler.publish(JSON.stringify(args));
    }

    private convertWeights(phaseTwoArgs: PhaseTwoArgs, weights: Map<PhaseTwoMeasuresEnum, number>): any {
        return {
            compactnessWeight: {
                measure: phaseTwoArgs.compactnessOption,
                weight: weights.get(PhaseTwoMeasuresEnum.COMPACTNESS) / 100
            },
            competitivenessWeight: {
                measure: phaseTwoArgs.politicalCompetitivenessOption,
                weight: weights.get(PhaseTwoMeasuresEnum.POLITICAL_COMPETITIVENESS) / 100
            },
            fairnessWeight: {
                measure: phaseTwoArgs.politicalFairnessOption,
                weight: weights.get(PhaseTwoMeasuresEnum.PARTISAN_FAIRNESS) / 100
            },
            popEqualityWeight: {
                measure: phaseTwoArgs.populationEqualityOption,
                weight: weights.get(PhaseTwoMeasuresEnum.POPULATION_EQUALITY) / 100
            },
            popHomogeneityWeight: {
                measure: phaseTwoArgs.populationHomogeneityOption,
                weight: weights.get(PhaseTwoMeasuresEnum.POPULATION_HOMOGENEITY) / 100
            },
        }
    }

    public setDispatch(dispatch: any) {
        this.dispatch = dispatch;
    }
    
    public setPrecinctMap(precinctMap: Map<string, IPrecinct>) {
        this.precincts = precinctMap;
    }
}
