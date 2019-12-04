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
    EFFICIENCY_GAP = 'efficiency_gap',
    GERRYMANDER_DEMOCRAT = 'gerrymander_democrat',
    GERRYMANDER_REPUBLICAN = 'gerrymander_republican',
    LOPSIDED_MARGINS = 'lopsided_margins',
    MEAN_MEDIAN_DIFFERENCE = 'mean_median',
    PARTISAN_DEMOCRAT = 'partisan_democrat',
    PARTISAN_REPUBLICAN = 'partisan_republican'
}

export enum PopulationEqualityEnum {
    MOST_TO_LEAST = 'most_to_least',
    IDEAL = 'ideal'
}

export enum PartyEnum {
    DEMOCRATIC = 'democratic',
    REPUBLICAN = 'republican',
    OTHER = 'other',
    TIE = 'tie',
    NOT_SET = 'not_set'
}

export enum PhaseTwoDepthEnum {
    STANDARD = 'standard',
    LEVEL = 'level',
    TREE = 'tree'
}

export enum DemographicEnum {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    ASIAN = 'ASIAN',
    HISPANIC = 'HISPANIC',
    PACIFIC_ISLANDER = 'PACIFIC_ISLANDER',
    NATIVE_AMERICAN = 'NATIVE_AMERICAN',
    BIRACIAL = 'BIRACIAL',
    OTHER = 'OTHER',
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