import { IDemographics, IVoteData } from './index';

/**
 * Stores cluster information for intermediate and original congressional districts.
 * 
 * @export
 * @interface ICluster
 */
export interface ICluster {

    name: string;
    id: string;
    precinctKeys: Set<string>;
    demographicStats: IDemographics;
    votingStats: IVoteData;

}