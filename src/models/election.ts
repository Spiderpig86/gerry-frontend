import { IVoteData } from './vote';
import { ElectionEnum, PartyEnum } from './enums';

export interface IElection {

    presidential16: IVoteData;
    house16: IVoteData;
    house18: IVoteData;

}

export interface ClusterElection {

    id: string;
    electionType: ElectionEnum;
    winner: PartyEnum;
    votes: IVoteData

}