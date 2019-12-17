import * as Constants from '../../config/constants';
import * as mapActionCreators from '../../redux/modules/state/state';
import Axios from 'axios';

import {
    IPrecinct,
    AlgorithmEnum,
    PhaseOneArgs,
    ICluster,
    ResponseEnum,
    ElectionEnum,
    PhaseTwoArgs,
    PhaseTwoMeasuresEnum
} from '../../models';
import { formatResponse } from '../functions/response';
import { StompClient } from '../stomp';
import { ModelMapper } from '../mapping/model-mapper';
import { store } from '../../index';

export class PhaseTwoService {
    private dispatch: any;
    private handler: StompClient;
    private precincts: Map<string, IPrecinct>;
    private oldClusters: Map<string, ICluster>;
    private newClusters: Map<string, ICluster>;
    private isRunning: boolean;

    constructor(precincts: Map<string, IPrecinct>, dispatch: any, oldClusters: Map<string, ICluster>, newClusters: Map<string, ICluster>) {
        this.precincts = precincts;
        this.dispatch = dispatch;
        this.oldClusters = oldClusters;
        this.newClusters = newClusters;
        this.handler = new StompClient(
            this.generateUrl(),
            this.getPath(),
            `/algorithm/phase2`,
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        );
        this.isRunning = false;
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

        // const jobId = data.jobId;
        const logs = data.logs;
        this.dispatch(mapActionCreators.appendLogs(logs));

        if (data.statusCode === 'success') {
            this.pause();
            // GET SCORES
            // this.start(store.getState().stateReducer.phaseTwoArgs);
            const oldDistrictScores: any[] = Object.entries(data.oldDistrictScores);
            const oldStateScores: any = data.oldStateScores;
            const newDistrictScores: any[] = Object.entries(data.newDistrictScores);
            const newStateScores: any = data.newStateScores;

            // console.log(data);
            // console.log(data.oldDistrictScores);
            console.log(data.newStateScores);

            for (const oldDistrictEntry of oldDistrictScores) {
                console.log(this.oldClusters, oldDistrictEntry);
                
                const district = this.oldClusters.get(oldDistrictEntry[0].substring(1));
                district.objectiveFunctionScores = oldDistrictEntry[1];
            }
            
            for (const newDistrictEntry of newDistrictScores) {
                const district = this.newClusters.get(newDistrictEntry[0]);
                district.objectiveFunctionScores = newDistrictEntry[1];
            }
            console.log(oldStateScores, newStateScores);
            

            this.dispatch(mapActionCreators.setPhaseTwoScores({
                old: oldStateScores,
                new: newStateScores
            }));
            this.dispatch(mapActionCreators.setOldClustersCreator(new Map(this.oldClusters)));
            this.dispatch(mapActionCreators.setNewClustersCreator(new Map(this.newClusters)));
            this.dispatch(mapActionCreators.setPhaseTwoRunning(false));
            
            return;
        }

        if (!this.isRunning) {
            this.pause();
            return;
        }

        const info = data.deltas[0];
        const newDemographicData: any[] = Object.entries(info.newDemographicData);
        const newElectionData: any[] = Object.entries(info.newElectionData);

        // For each district, set the new demographic data
        for (const demographicData of newDemographicData) {
            const district = this.newClusters.get(demographicData[0]);
            // console.log(demographicData[0], district, this.districts);
            // console.log(demographicData[1]);

            district.demographicData = {
                ...demographicData[1],
                population: ModelMapper.toIDemographic(demographicData[1].population)
            };
        }

        // For each district, set the new election data
        for (const electionData of newElectionData) {
            const district = this.newClusters.get(electionData[0]);
            district.electionData = this.getElection(electionData[1]);
        }
        // Remove the precinct from both districts and add it to the specified one
        for (const districtId of Object.keys(info.newDemographicData)) {
            const district = this.newClusters.get(districtId);
            district.precinctNames.delete(info.movedPrecinctId);
        }

        // Update precinct/district
        const district = this.newClusters.get(info.newDistrictId);
        district.precinctNames.add(info.movedPrecinctId);

        const precinct = this.precincts.get(info.movedPrecinctId);
        precinct.newCdId = Number(info.newDistrictId);
        
        this.dispatch(mapActionCreators.setPrecinctMap(new Map(this.precincts)));
        this.dispatch(mapActionCreators.setNewClustersCreator(new Map(this.newClusters)));

        // setTimeout(() => {
        this.start(store.getState().stateReducer.phaseTwoArgs);
        // }, 500);
    }

    private onClose(): void {
        console.log('Closed stomp client');
    }

    public start(phaseTwoArgs: PhaseTwoArgs) {
        this.isRunning = true;
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
            ...this.convertWeights(phaseTwoArgs, phaseTwoArgs.weights)
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
            }
        };
    }

    private getElection(electionData: any) {
        switch (electionData.electionType) {
            case ElectionEnum.PRES_16:
                return {
                    presidential16: ModelMapper.toIVote(electionData)
                };
            case ElectionEnum.HOUSE_16:
                return {
                    house16: ModelMapper.toIVote(electionData)
                };
            default:
                return {
                    house18: ModelMapper.toIVote(electionData)
                };
        }
    }

    public pause(): void {
        this.isRunning = false;
    }

    public getIsRunning(): boolean {
        return this.isRunning;
    }

    public setDispatch(dispatch: any) {
        this.dispatch = dispatch;
    }

    public setPrecinctMap(precinctMap: Map<string, IPrecinct>) {
        this.precincts = precinctMap;
    }

    public setOldClusters(oldClusters: Map<string, ICluster>) {
        this.oldClusters = oldClusters;
    }

    public setNewClusters(newClusters: Map<string, ICluster>) {
        this.newClusters = newClusters;
    }
}
