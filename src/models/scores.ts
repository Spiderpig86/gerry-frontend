export interface Scores {
    compactness: Measure;
    competitiveness: Measure;
    fairness: Measure;
    populationEquality: Measure;
    populationHomogeneity: Measure;
    mostToLeastPercentDifference?: number;
    sum: number;
}

export interface Measure {
    measure: string;
    score: number;
}