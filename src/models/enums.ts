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
    PRES_16 = 'ELECTION_PRES_16',
    HOUSE_16 = 'ELECTION_HOUSE_16',
    HOUSE_18 = 'ELECTION_HOUSE_18'
}

export enum CompactnessEnum {
    GRAPH_THEORETICAL = 'GRAPH_THEORETICAL',
    POLSBY_POPPER = 'POLSBY_POPPER',
    SCHWARTZBERG = 'SCHWARTZBERG'
}

export enum PoliticalCompetitivenessEnum {
    MARGIN_OF_VICTORY = 'MARGIN_OF_VICTORY',
}

export enum PoliticalFairnessEnum {
    EFFICIENCY_GAP = 'EFFICIENCY_GAP',
    GERRYMANDER_DEMOCRAT = 'GERRYMANDER_DEMOCRAT',
    GERRYMANDER_REPUBLICAN = 'GERRYMANDER_REPUBLICAN',
    LOPSIDED_MARGINS = 'LOPSIDED_MARGINS',
    MEAN_MEDIAN_DIFFERENCE = 'MEAN_MEDIAN_DIFFERENCE',
    PARTISAN = 'PARTISAN'
}

export enum PartyEnum {
    DEMOCRATIC = 'DEMOCRATIC',
    REPUBLICAN = 'REPUBLICAN',
    OTHER = 'OTHER'
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
    NOT_SET = 'NOT_SET'
}

export enum AlgorithmEnum {
    PHASE_0_1 = 'PHASE_0_1',
    PHASE_2 = 'PHASE_2'
}

export enum ResponseEnum {
    OK = 'OK',
    ERROR = 'ERR'
}