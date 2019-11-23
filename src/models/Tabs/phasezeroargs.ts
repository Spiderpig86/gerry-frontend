import { ElectionEnum, DemographicEnum, PartyEnum, StateEnum } from '../enums';

export interface PhaseZeroArgs {
    populationThreshold: number;
    electionType: ElectionEnum;
    voteThreshold: number;
    stateType: StateEnum;
}

export interface PhaseZeroResult {
    precinctCount: number,
    partyType: PartyEnum,
    demographicType: DemographicEnum,
    meanDemographicPercentage: number,
    meanPartyPercentage: number,
    minPrecinctPop: number,
    maxPrecinctPop: number,
    meanPrecinctPop: number
}