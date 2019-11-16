/**
 * File for all application constants (strings, tokens, etc).
 */

// Map Values
export const OPEN_STREET_MAP_ENDPOINT = `https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`;
export const MAP_BOX_ENDPOINT = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=`;
export const MAP_BOX_TOKEN = `pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A`;
export const MAP_BOX_THEME_LIGHT = 'mapbox.light';
export const MAP_BOX_THEME_DARK = 'mapbox.dark';
export const MAP_BOX_THEME_STREETS = 'mapbox.streets';

// Default Geojson
export const EMPTY_PRECINCTS = { type: 'FeatureCollection', features: [] };

// Default colors
export const COLOR_DEFAULT = 'rgb(51, 136, 255)';
export const COLOR_DEMOCRAT = '#007abf';
export const COLOR_REPUBLICAN = '#c03339';
export const COLOR_INDEPENDENT = '#2db82d';