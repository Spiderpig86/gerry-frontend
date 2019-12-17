import { IDemographics } from './index';
import { IElection } from './election';
import { ClusterDemographics } from './demographics';
import { PartyEnum, ElectionEnum } from './enums';
import { IVoteData } from './vote';
import { Scores } from './scores';

/**
 * Stores cluster information for intermediate and original congressional districts.
 * Also contains a set of all precincts in this cluster
 * 
 * @export
 * @interface ICluster
 */
export interface ICluster {

    numericalId: string;
    type?: string;
    incumbent?: { name: string; party: PartyEnum; };
    precinctNames: Set<string>;
    // counties: Set<string>;
    // adjacentClusterKeys: Set<string>; // Store adjacent clusters, used in phase 2 for combine
    demographicData: ClusterDemographics;
    electionData: IElection;
    objectiveFunctionScores: Scores;
    isMajorityMinority: boolean;

    [x: string]: any;

}

export interface ClusterProperties {
    republicanRepCount: number;
    democraticRepCount: number;
    house16: IVoteData;
    house18: IVoteData;
}

export interface ClusterCount {
    democraticCount: number;
    republicanCount: number;
    tieCount: number;
    election?: ElectionEnum;
}