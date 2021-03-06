import { LatLng } from 'leaflet';

// Server
export const APP_API = `http://localhost:8080/`;
export const APP_API_WS = `ws://localhost:9001`;

// Map Values
export const OPEN_STREET_MAP_ENDPOINT = `https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`;
export const MAP_BOX_ENDPOINT = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=`;
export const MAP_BOX_TOKEN = `pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A`;
export const MAP_BOX_THEME_LIGHT = 'mapbox.light';
export const MAP_BOX_THEME_DARK = 'mapbox.dark';
export const MAP_BOX_THEME_STREETS = 'mapbox.streets';

// Default Geojson
export const EMPTY_PRECINCTS = { type: 'FeatureCollection', features: [] };
export const BORDER_WEIGHT_NORMAL = 0.5;
export const BORDER_WEIGHT_HOVER = 5;

// Default colors
export const COLOR_DEFAULT_RGB = 'rgb(51, 136, 255)';
export const COLOR_DEMOCRAT = '#007abf';
export const COLOR_REPUBLICAN = '#c03339';
export const COLOR_INDEPENDENT = '#2db82d';
export const COLOR_DEMOGRAPHIC = '#fcd27a';
export const COLOR_COUNT = 60;
export const COLOR_UPPER_THRESHOLD = 0.75;
export const COLOR_MIDDLE_THRESHOLD = 0.5;
export const COLOR_LOWER_THRESHOLD = 0.25;
export const COLOR_AMPLIFY_FACTOR = 3;
export const COLOR_DARKEN_FACTOR = 0.25;
export const COLOR_FILL_OPACITY = 0.75;
export const COLOR_FILL_OPACITY_STATE = 0.25;
export const COLOR_NEIGHBOR_HIGHLIGHT = '#3949AB';
export const COLOR_PZERO_HIGHLIGHT = '#fb861e';

// Initial Redux State Values
export const DEFAULT_THRESHOLD = 75;
export const DEFAULT_NUM_DISTRICTS = 5;
export const DEFAULT_POP_PRECENT_MIN = 80;
export const DEFAULT_POP_PRECENT_MAX = 90;
export const DEFAULT_OF_VALUE = 0.0;
export const DEFAULT_PHASE_TWO_RETRIES = 10;

export const MAP_CENTER = new LatLng(40.3, -96.0);