import { IDemographics, IVoteData } from './index';

/**
 * Stores cluster information for intermediate and original congressional districts.
 * Also contains a set of all precincts in this cluster
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