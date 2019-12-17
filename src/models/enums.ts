export enum MapFilterEnum {
    WHITE_DENSITY = 'WHITE_DENSITY',
    BLACK_DENSITY = 'BLACK_DENSITY',
    HISPANIC_DENSITY = 'HISPANIC_DENSITY',
    ASIAN_DENSITY = 'ASIAN_DENSITY',
    NATIVE_AMERICAN_DENSITY = 'NATIVE_AMERICAN_DENSITY',
    PACIFIC_ISLANDER_DENSITY = 'PACIFIC_ISLANDER_DENSITY',
    OTHER_DENSITY = 'OTHER_DENSITY',
    BIRACIAL_DENSITY = 'BIRACIAL_DENSITY',
    PRES_2016 = 'MAP_FILTER_PRES_2016',
    HOUSE_2016 = 'MAP_FILTER_HOUSE_2016',
    HOUSE_2018 = 'MAP_FILTER_HOUSE_2018',
    SENATE_2016 = 'MAP_FILTER_SENATE_2016',
    SENATE_2018 = 'MAP_FILTER_SENATE_2018',
    DEFAULT = 'MAP_FILTER_PLAIN'
}

export enum ViewLevelEnum {
    PRECINCTS = 'VIEW_LEVEL_PRECINCTS',
    OLD_DISTRICTS = 'VIEW_LEVEL_OLD_DISTRICTS',
    NEW_DISTRICTS = 'VIEW_LEVEL_NEW_DISTRICTS'
}

export enum ElectionEnum {
    PRES_16 = 'pres_16',
    HOUSE_16 = 'house_16',
    HOUSE_18 = 'house_18'
}

export enum CompactnessEnum {
    GRAPH_THEORETICAL = 'graph_theoretical',
    POLSBY_POPPER = 'polsby_popper',
    SCHWARTZBERG = 'schwartzberg',
    REOCK = 'reock',
    CONVEX_HULL = 'convex_hull'
}

export enum PoliticalCompetitivenessEnum {
    MARGIN_OF_VICTORY = 'margin_of_victory',
}

export enum PoliticalFairnessEnum {
    GERRYMANDER_DEMOCRAT = 'gerrymander_democrat',
    GERRYMANDER_REPUBLICAN = 'gerrymander_republican',
    LOPSIDED_MARGINS = 'lopsided_margins',
    PARTISAN_DEMOCRAT = 'partisan_democrat',
    PARTISAN_REPUBLICAN = 'partisan_republican',
    EFFICIENCY_GAP = 'efficiency_gap'
}

export enum PopulationEqualityEnum {
    MOST_TO_LEAST = 'most_to_least',
    IDEAL = 'ideal'
}

export enum PopulationHomogeneityEnum {
    NORMALIZED_SQUARE_ERROR = 'normalized_square_error'
}

export enum PartyEnum {
    DEMOCRATIC = 'democratic',
    REPUBLICAN = 'republican',
    OTHER = 'other',
    TIE = 'tie',
    NOT_SET = 'not_set'
}

export enum DemographicEnum {
    WHITE = 'pop_white_nh',
    BLACK = 'pop_black_nh',
    ASIAN = 'pop_asian_nh',
    HISPANIC = 'pop_hispanic',
    PACIFIC_ISLANDER = 'pop_nhpi_nh',
    NATIVE_AMERICAN = 'pop_amin_nh',
    BIRACIAL = 'pop_2more_nh',
    OTHER = 'pop_other_nh',
}

export enum StateEnum {
    CA = 'CA',
    UT = 'UT',
    VA = 'VA',
    NOT_SET = 'not_set'
}

export enum AlgorithmEnum {
    PHASE_0_1 = 'PHASE_0_1',
    PHASE_2 = 'PHASE_2'
}

export enum ResponseEnum {
    OK = 'OK',
    ERROR = 'ERR'
}

export enum AlgorithmRunEnum {
    TO_COMPLETION = 'to_completion',
    BY_STEP = 'by_step'
}

export enum PhaseOneMajMinPairsEnum {
    STANDARD = 'standard'
}

export enum PhaseOneOtherPairsEnum {
    STANDARD = 'standard'
}

export enum PhaseOneStopEnum {
    JOIN_SMALLEST = 'join_smallest'
}

export enum PhaseTwoMeasuresEnum {
    POPULATION_EQUALITY = 'POPULATION_EQUALITY',
    COMPACTNESS = 'COMPACTNESS',
    PARTISAN_FAIRNESS = 'POLITICAL_FAIRNESS',
    POLITICAL_COMPETITIVENESS = 'POLITICAL_COMPETITIVENESS',
    POPULATION_HOMOGENEITY = 'POPULATION_HOMOGENEITY'
}

export enum PhaseTwoDepthEnum {
    STANDARD = 'standard',
    LEVEL = 'level',
    TREE = 'tree'
}

export enum PhaseTwoPrecinctMoveEnum {
    RANDOM = 'random',
    MAJ_MIN = 'maj_min',
    POP_NORMALIZER = 'population_normalizer'
}