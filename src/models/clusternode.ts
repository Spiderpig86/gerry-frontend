import { IDemographics as IDemographicData, IVoteData as IElectionData } from './index';

/**
 * Stores cluster information for intermediate and original congressional districts.
 * Also contains a set of all precincts in this cluster
 * 
 * @export
 * @interface ICluster
 */
export interface ICluster {

    // name: string;
    id: string;
    incumbent: string;
    precinctKeys: Set<string>;
    counties: Set<string>;
    // adjacentClusterKeys: Set<string>; // Store adjacent clusters, used in phase 2 for combine
    demographicData: IDemographicData;
    electionData: IElectionData;
    objectiveFunctionScores: IObjectiveFunctionScores;

    [x: string]: any;

}

// TODO: Map in state for each election and newly generated districts containing ICluster with objective function scores
export interface IObjectiveFunctionScores {

    politicalFairness: number;
    populationEquality: number;
    compactness: number;
    contiguity: number;

}