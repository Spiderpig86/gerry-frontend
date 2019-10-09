/**
 * File for all application constants (strings, tokens, etc).
 */

/**
 * MAP VALUES
 */
export const OPEN_STREET_MAP_ENDPOINT = `https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`;
export const MAP_BOX_ENDPOINT = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=`;
export const MAP_BOX_TOKEN = `pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A`;
export const MAP_BOX_THEME_LIGHT = 'mapbox.light';
export const MAP_BOX_THEME_DARK = 'mapbox.dark';
export const MAP_BOX_THEME_STREETS = 'mapbox.streets';

// TEST FIELDS
export const HISTORIC_VOTE = 'HistoricVote';
export const ETHNICITY = 'Ethnicity';
export const REP_CHANCE = 'RepublicanChance';
export const DEM_CHANCE = 'DemocratChance';
export const MINORITY_REP_CHANCE = 'MinorityRepChance';

// MAP FILTERS
export const MAP_FILTER_WHITE_DENSITY = 'WHITE_DENSITY';
export const MAP_FILTER_BLACK_DENSITY = 'BLACK_DENSITY';
export const MAP_FILTER_HISPANIC_DENSITY = 'HISPANIC_DENSITY';
export const MAP_FILTER_ASIAN_DENSITY = 'ASIAN_DENSITY';
export const MAP_FILTER_NATIVE_AMERICAN_DENSITY = 'NATIVE_AMERICAN_DENSITY';
export const MAP_FILTER_PACIFIC_ISLANDER_DENSITY = 'PACIFIC_ISLANDER_DENSITY';
export const MAP_FILTER_OTHER_DENSITY = 'OTHER_DENSITY';
export const MAP_FILTER_BIRACIAL_DENSITY = 'BIRACIAL_DENSITY';
export const MAP_FILTER_PRES_2016 = 'MAP_FILTER_PRES_2016';
export const MAP_FILTER_CONGRESS_2016 = 'MAP_FILTER_CONGRESS_2016';
export const MAP_FILTER_CONGRESS_2018 = 'MAP_FILTER_CONGRESS_2018';
export const MAP_FILTER_DISTRICTS = 'MAP_FILTER_DISTRICTS';

export const DISTRICT_COLORS = ['#0099cd', '#e31a1c', '#00cd99', '#ffca5d', '#ff7f00', '#99cd00', '#cd0099', '#9900cd', '#8dd3c7', '#bebada', '#fb8072', '#1f78b4'];