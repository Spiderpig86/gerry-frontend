import { StateEnum, ElectionEnum, DemographicEnum, PhaseTwoMeasuresEnum, PhaseTwoDepthEnum, PhaseTwoPrecinctMoveEnum } from '../enums';

export interface PhaseTwoArgs {
    stateType: StateEnum;
    electionData: ElectionEnum;

    stateId: string;
    demographicTypes: Set<DemographicEnum>;
    upperBound: number;
    lowerBound: number;
    epsilon: number;
    weights: Map<PhaseTwoMeasuresEnum, number>;
    phaseTwoDepthHeuristic: PhaseTwoDepthEnum;
    precinctMoveHeuristic: PhaseTwoPrecinctMoveEnum;
}
