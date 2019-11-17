import { ElectionEnum, DemographicEnum, PartyEnum, StateEnum } from '../enums';

export interface PhaseZeroArgs {
    populationThreshold: number;
    electionType: ElectionEnum;
    voteThreshold: number;
    stateType: StateEnum;
}

export interface PhaseZeroResult {
    precinctId: string,
    demographic: DemographicEnum,
    demographicPopulation: number,
    totalPopulation: number,
    party: PartyEnum,
    partyVoteCount: number,
    voteTotal: number
}