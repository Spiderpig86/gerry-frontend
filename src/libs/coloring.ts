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
import { Properties, IPrecinct, MapFilterEnum, ViewLevelEnum } from '../models';
import { hashPrecinct } from './hash';

export class Coloring {

    public colors: any[];

    constructor() {
        this.colors = distinctColors({ count: 30 });
    }

    public getDefaultStyle(feature: any, layer: any): PathOptions {
        return {
            color: Constants.COLOR_DEFAULT,
            weight: 0.75,
        };
    }

    public colorPolitical(properties: Properties, filter: string, majorityParty: { party: string; percent: number }) {

        switch (majorityParty.party) {
            case 'D':
                    // 3383c0
                let partyColor: Color = majorityParty.percent >= 0.75
                    ? Color.default(Constants.COLOR_DEMOCRAT).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default(Constants.COLOR_DEMOCRAT).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default(Constants.COLOR_DEMOCRAT).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.default(Constants.COLOR_REPUBLICAN).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default(Constants.COLOR_REPUBLICAN).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default(Constants.COLOR_REPUBLICAN).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.default(Constants.COLOR_INDEPENDENT).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default(Constants.COLOR_INDEPENDENT).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default(Constants.COLOR_INDEPENDENT).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'O':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.default('#6930be').saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default('#6930be').lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default('#6930be').darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0,
                };
        }
    }

    public colorDemographic(properties: any, filter: string) {
        const demographicPercent = this.getPopulationPercentByDemographic(properties, filter);
        let color = Color.rgb([252, 210, 122]).saturate((demographicPercent - 0.75) * 3)
            .darken(demographicPercent - 0.75)
            .hex();
        if (demographicPercent < 0.75) {
            color = Color.rgb([252, 210, 122])
                .lighten(0.75 - demographicPercent)
                .hex();
        }

        if (properties.pop_total === 0) {
            color = Color.rgb([0, 0, 0]).alpha(0).hex();
        }

        return {
            color: Color.rgb([252, 210, 122])
                .darken(0.5)
                .hex(),
            weight: 0.5,
            fillOpacity: 0.75,
            fillColor: color
        };
    }

    public colorDefault(properties: any, level: string, precinctMap: Map<string, IPrecinct>): PathOptions {

        const colorConfig = {
            color: 'rgb(51, 136, 255)',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: 'rgb(51, 136, 255)'
        };
        
        if (level === ViewLevelEnum.OLD_DISTRICTS) {
            // const color = Constants.DISTRICT_COLORS[properties.cd - 1];
            const precinct = precinctMap.get(hashPrecinct(properties));
            if (!precinct) {
                return colorConfig;
            }

            const cdId = level === ViewLevelEnum.OLD_DISTRICTS ? precinct.originalCdId - 1 : precinct.newCdId - 1;

            const color = Color.rgb(this.colors[cdId]._rgb).hex();
            colorConfig.color = Color.default(color)
                                .darken(0.5)
                                .hex();
            colorConfig.weight = 0.75;
            colorConfig.fillOpacity = 0.75;
            colorConfig.fillColor = color;
        }

        return colorConfig;
    }

    public getPopulationPercentByDemographic(properties: any, filter: string): number {
        let demographicPopulation = 0;
        switch (filter) {
            case MapFilterEnum.WHITE_DENSITY:
                demographicPopulation = properties.pop_white_nh
                break;
            case MapFilterEnum.BLACK_DENSITY:
                demographicPopulation = properties.pop_black_nh;
                break;
            case MapFilterEnum.ASIAN_DENSITY:
                demographicPopulation = properties.pop_asian_nh;
                break;
            case MapFilterEnum.HISPANIC_DENSITY:
                demographicPopulation = properties.pop_hispanic;
                break;
            case MapFilterEnum.NATIVE_AMERICAN_DENSITY:
                demographicPopulation = properties.pop_amin_nh;
                break;
            case MapFilterEnum.PACIFIC_ISLANDER_DENSITY:
                demographicPopulation = properties.pop_nhpi_nh;
                break;
            case MapFilterEnum.OTHER_DENSITY:
                demographicPopulation = properties.pop_other_nh;
                break;
            case MapFilterEnum.BIRACIAL_DENSITY:
                demographicPopulation = properties.pop_2more_nh;
                break;
        }

        return demographicPopulation / properties.pop_total;
    }

    public getRandomColor(): string {
        const h = this.randomInt(0, 360);
        const s = this.randomInt(42, 98);
        const l = this.randomInt(38, 90);
        return Color.hsl([h, s, l]).hex();
    }

    private randomInt(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}