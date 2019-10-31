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
    adjacentClusterKeys: Set<string>; // Store adjacent clusters, used in phase 2 for combine
    demographicStats: IDemographics;
    votingStats: IVoteData;
    objectiveFunctionScores: IObjectiveFunctionScores;

}

// TODO: Map in state for each election and newly generated districts containing ICluster with objective function scores
export interface IObjectiveFunctionScores {

    efficiencyGap: number;
    lopsidedMargins: number;
    meanMedianDifference: number;

}