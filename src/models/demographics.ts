/**
 * Holds all demographic data needed for population and voting breakdown.
 * 
 * @export
 * @interface IDemographics
 */

// TODO: Add mapping in phase 2 service from https://pastebin.com/NfytK3iM to this interface
export interface IDemographics {
    White: number;
    AfricanAmerican: number;
    Hispanic?: number;
    NativeAmerican: number;
    Asian: number;
    PacificIslander: number;
    Other: number;
    Biracial: number;
}

export interface ClusterDemographics {
    population: IDemographics;
    totalPopulation: number;
    totalVotingAgePopulaton: number;
    votingAgePopulation: IDemographics;
}