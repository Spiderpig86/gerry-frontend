import { IVoteData } from './vote';
import { ElectionEnum, PartyEnum } from './enums';

export interface IElection {

    presidential16: IVoteData;
    house16: IVoteData;
    house18: IVoteData;

}