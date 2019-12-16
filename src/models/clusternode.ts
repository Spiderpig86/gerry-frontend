import { IDemographics } from './index';
import { IElection } from './election';
import { ClusterDemographics } from './demographics';
import { PartyEnum, ElectionEnum } from './enums';
import { IVoteData } from './vote';

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
    objectiveFunctionScores: IObjectiveFunctionScores;
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

// TODO: Map in state for each election and newly generated districts containing ICluster with objective function scores
export interface IObjectiveFunctionScores {

    politicalFairness: number;
    populationEquality: number;
    compactness: number;
    contiguity: number;

}