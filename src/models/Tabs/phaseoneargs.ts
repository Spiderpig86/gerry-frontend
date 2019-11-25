import { ElectionEnum, CompactnessEnum, PoliticalFairnessEnum, DemographicEnum } from '../enums';
import { ICluster } from '../clusternode';

export interface PhaseOneArgs {
    numDistricts: number;
    electionData: ElectionEnum;
    minPopulationPercent: number;
    maxPopulationPercent: number;
    selectedDemographics: Set<DemographicEnum>;
    compactnessOption: CompactnessEnum;
    politicalFairnessOption: PoliticalFairnessEnum;
    objectivePopulationEquality: number;
    objectiveCompactness: number;
    objectivePartisanFairness: number;
    objectiveContiguity: number;
    intermediateResults: boolean;
}

export interface PhaseOneResult {
    deltas: PhaseOneMergeDelta[];
}

export interface PhaseOneMergeDelta {
    iteration: number;
    changedNodes: Map<string, string>; // Holds the new district ids for each precinct for iteration 0
    newDistricts: Map<string, ICluster>; // Holds the final mapping of new districts every iteration (intermediate stats), for non-iterative it will contain the final stats for each district
}