/**
 * Contains functions for coloring map elements.
 *
 * @export
 * @class Coloring
 */
import * as Color from 'color';
import * as Constants from '../config/constants';

import * as ColorArr from './colors.json';

import distinctColors from 'distinct-colors';

import { PathOptions } from 'leaflet';
import { PrecinctProperties, IPrecinct, MapFilterEnum, ViewLevelEnum, ICluster } from '../models';
import { hashPrecinct } from './functions/hash';

export class Coloring {

    public colors: any[];
    public districtColors: string[];

    constructor() {
        // this.colors = distinctColors({ count: Constants.COLOR_COUNT });
        this.colors = ColorArr;
    }

    public getPoliticalStyle(majorityParty: { party: string; percent: number }, zoom: number) {
        const opacity = Constants.COLOR_FILL_OPACITY - (zoom > 8 ? .25 : 0);
        switch (majorityParty.party) {
            case 'D':
                // 3383c0
                let partyColor: Color = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default(Constants.COLOR_DEMOCRAT).saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default(Constants.COLOR_DEMOCRAT).lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default(Constants.COLOR_DEMOCRAT).darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: opacity,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default(Constants.COLOR_REPUBLICAN).saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default(Constants.COLOR_REPUBLICAN).lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default(Constants.COLOR_REPUBLICAN).darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: opacity,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default(Constants.COLOR_INDEPENDENT).saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default(Constants.COLOR_INDEPENDENT).lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default(Constants.COLOR_INDEPENDENT).darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: opacity,
                    fillColor: partyColor.hex()
                };
            case 'O':
                partyColor = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default('#6930be').saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default('#6930be').lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default('#6930be').darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: opacity,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#ccc',
                    weight: 0.1,
                    fillOpacity: 0,
                };
        }
    }

    public getDemographicStyle(properties: any, filter: string, zoom: number) {
        const opacity = Constants.COLOR_FILL_OPACITY - (zoom > 8 ? .25 : 0);
        const demographicPercent = this.getPopulationPercentByDemographic(properties, filter);
        let color = Color.default(Constants.COLOR_DEMOGRAPHIC).saturate((demographicPercent - Constants.COLOR_MIDDLE_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR)
            .darken(demographicPercent - Constants.COLOR_MIDDLE_THRESHOLD * 1.2)
            .hex();
        if (demographicPercent < Constants.COLOR_MIDDLE_THRESHOLD) {
            color = Color.default(Constants.COLOR_DEMOGRAPHIC)
                .lighten(Constants.COLOR_MIDDLE_THRESHOLD - demographicPercent)
                .hex();
        }

        if (properties.pop_total === 0) {
            color = Color.rgb([0, 0, 0]).alpha(0).hex();
        }

        return {
            color: Color.default(Constants.COLOR_DEMOGRAPHIC)
                .darken(0.5)
                .hex(),
            weight: 0.5,
            fillOpacity: opacity,
            fillColor: color
        };
    }

    
    public getDemographicStyleDistrict(district: ICluster, filter: string, zoom: number) {
        const opacity = Constants.COLOR_FILL_OPACITY - (zoom > 8 ? .25 : 0);
        const demographicPercent = this.getPopulationPercentByDemographicDistrict(district, filter);
        let color = Color.default(Constants.COLOR_DEMOGRAPHIC).saturate((demographicPercent - Constants.COLOR_MIDDLE_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR)
            .darken(demographicPercent - Constants.COLOR_MIDDLE_THRESHOLD * 1.2)
            .hex();
        if (demographicPercent < Constants.COLOR_MIDDLE_THRESHOLD) {
            color = Color.default(Constants.COLOR_DEMOGRAPHIC)
                .lighten(Constants.COLOR_MIDDLE_THRESHOLD - demographicPercent)
                .hex();
        }

        return {
            color: Color.default(Constants.COLOR_DEMOGRAPHIC)
                .darken(0.5)
                .hex(),
            weight: 0.5,
            fillOpacity: opacity,
            fillColor: color
        };
    }

    public colorDistrictLoading(feature: any, zoom: number): PathOptions {
        const opacity = Constants.COLOR_FILL_OPACITY - (zoom > 8 ? .25 : 0);
        const cdId = feature.properties.cd;
        // const fillColor = Color.rgb(this.colors[cdId]._rgb).hex();
        const fillColor = Color.rgb(this.colors[cdId]).hex();
        const color = Color.default(fillColor)
            .darken(Constants.COLOR_DARKEN_FACTOR)
            .hex();
        return {
            color,
            weight: Constants.BORDER_WEIGHT_NORMAL,
            fillOpacity: opacity,
            fillColor: fillColor
        };
    }

    public colorDefaultDistrict(properties: any, level: string, precinctMap: Map<string, IPrecinct>, zoom: number): PathOptions {
        const opacity = Constants.COLOR_FILL_OPACITY - (zoom > 8 ? .25 : 0);
        const colorConfig = {
            color: Constants.COLOR_DEFAULT_RGB,
            weight: 1,
            fillOpacity: Constants.COLOR_FILL_OPACITY_STATE,
            fillColor: Constants.COLOR_DEFAULT_RGB
        };
        const precinct = precinctMap.get(hashPrecinct(properties));
        if (!precinct) {
            return colorConfig;
        }
        const cdId = (level === ViewLevelEnum.OLD_DISTRICTS ? precinct.originalCdId : Math.round(Math.random() * 20000));
        // const color = Color.rgb(this.colors[cdId]._rgb).hex();
        const color = Color.rgb(this.colors[cdId]).hex();
        colorConfig.color = Color.default(color)
            .darken(Constants.COLOR_DARKEN_FACTOR)
            .hex();
        colorConfig.weight = Constants.BORDER_WEIGHT_NORMAL;
        colorConfig.fillOpacity = opacity;
        colorConfig.fillColor = color;
        return colorConfig;
    }

    public colorDefault(): PathOptions {
        const colorConfig = {
            color: Constants.COLOR_DEFAULT_RGB,
            weight: 1,
            fillOpacity: Constants.COLOR_FILL_OPACITY_STATE,
            fillColor: Constants.COLOR_DEFAULT_RGB
        };
        return colorConfig;
    }

    public colorPhaseZeroHighlight(zoom: number) {
        const opacity = Constants.COLOR_FILL_OPACITY - (zoom > 8 ? .25 : 0);
        return {
            color: Constants.COLOR_PZERO_HIGHLIGHT,
            weight: 1,
            fillOpacity: opacity,
            fillColor: Constants.COLOR_PZERO_HIGHLIGHT
        };
    }

    public getPopulationPercentByDemographic(properties: any, filter: string): number {
        let demographicPopulation = 0;
        switch (filter) {
            case MapFilterEnum.WHITE_DENSITY:
                demographicPopulation = properties.pop_white_nh || 0;
                break;
            case MapFilterEnum.BLACK_DENSITY:
                demographicPopulation = properties.pop_black_nh || 0;
                break;
            case MapFilterEnum.ASIAN_DENSITY:
                demographicPopulation = properties.pop_asian_nh || 0;
                break;
            case MapFilterEnum.HISPANIC_DENSITY:
                demographicPopulation = properties.pop_hispanic || 0;
                break;
            case MapFilterEnum.NATIVE_AMERICAN_DENSITY:
                demographicPopulation = properties.pop_amin_nh || 0;
                break;
            case MapFilterEnum.PACIFIC_ISLANDER_DENSITY:
                demographicPopulation = properties.pop_nhpi_nh || 0;
                break;
            case MapFilterEnum.OTHER_DENSITY:
                demographicPopulation = properties.pop_other_nh || 0;
                break;
            case MapFilterEnum.BIRACIAL_DENSITY:
                demographicPopulation = properties.pop_2more_nh || 0;
                break;
        }
        return demographicPopulation / properties.pop_total;
    }

    public getPopulationPercentByDemographicDistrict(district: ICluster, filter: string): number {
        let demographicPopulation = 0;
        switch (filter) {
            case MapFilterEnum.WHITE_DENSITY:
                demographicPopulation = district.demographicData.population.White;
                break;
            case MapFilterEnum.BLACK_DENSITY:
                demographicPopulation = district.demographicData.population.AfricanAmerican;
                break;
            case MapFilterEnum.ASIAN_DENSITY:
                demographicPopulation = district.demographicData.population.Asian;
                break;
            case MapFilterEnum.HISPANIC_DENSITY:
                demographicPopulation = district.demographicData.population.Hispanic;
                break;
            case MapFilterEnum.NATIVE_AMERICAN_DENSITY:
                demographicPopulation = district.demographicData.population.NativeAmerican;
                break;
            case MapFilterEnum.PACIFIC_ISLANDER_DENSITY:
                demographicPopulation = district.demographicData.population.PacificIslander;
                break;
            case MapFilterEnum.OTHER_DENSITY:
                demographicPopulation = district.demographicData.population.Other;
                break;
            case MapFilterEnum.BIRACIAL_DENSITY:
                demographicPopulation = district.demographicData.population.Biracial;
                break;
        }
        return demographicPopulation / district.demographicData.totalPopulation;
    }

    public getBlankStyle() {
        return {
            color: Color.default([255, 255, 255])
                .alpha(0)
                .hex(),
            weight: 0.5,
            fillOpacity: 0,
            fillColor: Color.rgb([0, 0, 0]).alpha(0).hex()
        };
    }
}