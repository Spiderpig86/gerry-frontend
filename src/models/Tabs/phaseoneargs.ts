import { ElectionEnum, DemographicEnum, StateEnum, AlgorithmRunEnum, PhaseOneMajMinPairsEnum, PhaseOneOtherPairsEnum, PhaseOneStopEnum } from '../enums';
import { ICluster } from '../clusternode';

/**
 * Note that this will encompass args for phase 1 and 2 as they are very intertwined.
 */

export interface PhaseOneArgs {
    stateType: StateEnum;
    electionData: ElectionEnum;
    
    numDistricts: number;
    demographicTypes: Set<DemographicEnum>;
    upperBound: number;
    lowerBound: number;
    algRunType: AlgorithmRunEnum;
    phaseOneMajMinPairHeuristic: PhaseOneMajMinPairsEnum;
    phaseOneOtherPairsHeuristic: PhaseOneOtherPairsEnum;
    stopHeurstic: PhaseOneStopEnum;
}

export interface PhaseOneResult {
    deltas: PhaseOneMergeDelta[];
    algPhaseType: string;
    statusCode: string;
    iteration: number;
    logs: string[];
}

export interface PhaseOneMergeDelta {
    iteration: number;
    changedNodes: Map<string, string>; // Holds the new district ids for each precinct for iteration 0
    newDistricts: Map<string, ICluster>; // Holds the final mapping of new districts every iteration (intermediate stats), for non-iterative it will contain the final stats for each district
}