/**
 * Voting statistics by party.
 * 
 * @export
 * @interface IVoteData
 */
export interface IVoteData {
    republicanVotes: number;
    democraticVotes: number;
    independentVotes?: number;
    otherVotes?: number;
}