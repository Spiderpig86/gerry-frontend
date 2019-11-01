import { ElectionEnum, CompactnessEnum, PoliticalFairnessEnum, DemographicEnum } from '../enums';

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