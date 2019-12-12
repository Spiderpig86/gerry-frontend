import { PartyEnum } from './enums';

/**
 * Voting statistics by party.
 * 
 * @export
 * @interface IVoteData
 */
export interface IVoteData {
    republicanVotes: number;
    democraticVotes: number;
    otherVotes?: number;
    totalVotes?: number;
    winners?: PartyEnum[];
}