import { ElectionEnum, DemographicEnum, PartyEnum } from '../enums';

export interface PhaseZeroArgs {
    demographicThreshold: number;
    selectedElection: ElectionEnum;
    partyThreshold: number;
}

export interface PhaseZeroResult {
    demographic: DemographicEnum,
    demographicPercentage: number,
    party: PartyEnum
}