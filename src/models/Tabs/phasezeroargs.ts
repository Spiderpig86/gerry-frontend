import { ElectionEnum, DemographicEnum, PartyEnum, StateEnum } from '../enums';

export interface PhaseZeroArgs {
    populationThreshold: number;
    electionType: ElectionEnum;
    voteThreshold: number;
    stateType: StateEnum;
}

export interface PhaseZeroResult {
    precinctBlocs: Map<PartyEnum, PrecinctBlocSummary[]>;
    totalVoteBlocCount: number;
}

export interface PrecinctBlocSummary {
    votingBlocCount: number,
    partyType: PartyEnum,
    demographicType: DemographicEnum,
    meanDemographicPercentage: number,
    meanPartyPercentage: number
}