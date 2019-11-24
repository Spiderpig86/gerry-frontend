/**
 * Contains functions for coloring map elements.
 *
 * @export
 * @class Coloring
 */
import * as Color from 'color';
import * as Constants from '../config/constants';

import distinctColors from 'distinct-colors';

import { PathOptions } from 'leaflet';
import { PrecinctProperties, IPrecinct, MapFilterEnum, ViewLevelEnum } from '../models';
import { hashPrecinct } from './functions/hash';

export class Coloring {

    public colors: any[];

    constructor() {
        this.colors = distinctColors({ count: Constants.COLOR_COUNT });
    }

    public getPoliticalStyle(properties: PrecinctProperties, filter: string, majorityParty: { party: string; percent: number }) {
        switch (majorityParty.party) {
            case 'D':
                    // 3383c0
                let partyColor: Color = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default(Constants.COLOR_DEMOCRAT).saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default(Constants.COLOR_DEMOCRAT).lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default(Constants.COLOR_DEMOCRAT).darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: Constants.COLOR_FILL_OPACITY,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default(Constants.COLOR_REPUBLICAN).saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default(Constants.COLOR_REPUBLICAN).lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default(Constants.COLOR_REPUBLICAN).darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: Constants.COLOR_FILL_OPACITY,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default(Constants.COLOR_INDEPENDENT).saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default(Constants.COLOR_INDEPENDENT).lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default(Constants.COLOR_INDEPENDENT).darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: Constants.COLOR_FILL_OPACITY,
                    fillColor: partyColor.hex()
                };
            case 'O':
                partyColor = majorityParty.percent >= Constants.COLOR_UPPER_THRESHOLD
                    ? Color.default('#6930be').saturate((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR).darken((majorityParty.percent - Constants.COLOR_UPPER_THRESHOLD))
                    : Color.default('#6930be').lighten((Constants.COLOR_UPPER_THRESHOLD - majorityParty.percent) * Constants.COLOR_AMPLIFY_FACTOR);
                return {
                    color: Color.default('#6930be').darken(Constants.COLOR_DARKEN_FACTOR).hex(),
                    weight: 0.5,
                    fillOpacity: Constants.COLOR_FILL_OPACITY,
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

    public getDemographicStyle(properties: any, filter: string) {
        const demographicPercent = this.getPopulationPercentByDemographic(properties, filter);
        let color = Color.default(Constants.COLOR_DEMOGRAPHIC).saturate((demographicPercent - Constants.COLOR_MIDDLE_THRESHOLD) * Constants.COLOR_AMPLIFY_FACTOR)
            .darken(demographicPercent - Constants.COLOR_MIDDLE_THRESHOLD)
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
            fillOpacity: Constants.COLOR_FILL_OPACITY,
            fillColor: color
        };
    }

    public colorDefault(properties: any, level: string, precinctMap: Map<string, IPrecinct>): PathOptions {
        const colorConfig = {
            color: Constants.COLOR_DEFAULT_RGB,
            weight: 1,
            fillOpacity: Constants.COLOR_FILL_OPACITY_STATE,
            fillColor: Constants.COLOR_DEFAULT_RGB
        };
        
        if (level === ViewLevelEnum.OLD_DISTRICTS) {
            const precinct = precinctMap.get(hashPrecinct(properties));
            if (!precinct) {
                return colorConfig;
            }
            const cdId = (level === ViewLevelEnum.OLD_DISTRICTS ? precinct.originalCdId : precinct.newCdId);
            const color = Color.rgb(this.colors[cdId]._rgb).hex();
            colorConfig.color = Color.default(color)
                                .darken(Constants.COLOR_DARKEN_FACTOR)
                                .hex();
            colorConfig.weight = Constants.BORDER_WEIGHT_NORMAL;
            colorConfig.fillOpacity = Constants.COLOR_FILL_OPACITY;
            colorConfig.fillColor = color;
        }
        return colorConfig;
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
}