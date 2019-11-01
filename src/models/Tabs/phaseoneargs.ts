import { ElectionEnum } from '../enums';
import { DemographicType } from '../types';

export interface PhaseOneArgs {
    numDistricts: number;
    electionData: ElectionEnum;
    minPopulationPercent: number;
    maxPopulationPercent: number;
    selectedDemographics: DemographicType[];
    compactnessOption: string; // TODO: Enum
    politicalFairnessOption: string;
    objectivePopulationEquality: number;
    objectiveCompactness: number;
    objectivePartisanFairness: number;
    objectiveContiguity: number;
    intermediateResults: boolean;
}