/**
 * Contains functions for coloring map elements.
 *
 * @export
 * @class Coloring
 */
import * as Color from 'color';
import * as Constants from '../../../config/constants';

import { PathOptions } from 'leaflet';
import { Properties } from '../../../models';

export class Coloring {

    public getDefaultStyle(feature: any, layer: any): PathOptions {
        return {
            color: 'rgb(51, 136, 255)',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: 'rgb(51, 136, 255)'
        };
    }

    public colorPolitical(properties: Properties, filter: string, majorityParty: { party: string; percent: number }) {

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.75
                    ? Color.default('#007abf').saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default('#007abf').lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default('#007abf').darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.default('#c03339').saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default('#c03339').lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default('#c03339').darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.default('#2db82d').saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default('#2db82d').lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.default('#2db82d').darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'O':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.default('#6930be').saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.default('#2d6930beb82d').lighten((0.75 - majorityParty.percent) * 3);
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

    public colorDefault(properties: any, level: string): PathOptions {
        if (level === Constants.VIEW_LEVEL_PRECINCTS) {
            return {
                color: 'rgb(51, 136, 255)',
                weight: 1,
                fillOpacity: 0.5,
                fillColor: 'rgb(51, 136, 255)'
            };
        } else {
            const color = Constants.DISTRICT_COLORS[properties.cd - 1];

            return {
                color: Color.default(color)
                    .darken(0.5)
                    .hex(),
                weight: 0.5,
                fillOpacity: 0.75,
                fillColor: color
            };
        }
    }

    public getPopulationPercentByDemographic(properties: any, filter: string): number {
        let demographicPopulation = 0;
        switch (filter) {
            case Constants.MAP_FILTER_WHITE_DENSITY:
                demographicPopulation = properties.pop_white_nh
                break;
            case Constants.MAP_FILTER_BLACK_DENSITY:
                demographicPopulation = properties.pop_black_nh;
                break;
            case Constants.MAP_FILTER_ASIAN_DENSITY:
                demographicPopulation = properties.pop_asian_nh;
                break;
            case Constants.MAP_FILTER_HISPANIC_DENSITY:
                demographicPopulation = properties.pop_hispanic;
                break;
            case Constants.MAP_FILTER_NATIVE_AMERICAN_DENSITY:
                demographicPopulation = properties.pop_amin_nh;
                break;
            case Constants.MAP_FILTER_PACIFIC_ISLANDER_DENSITY:
                demographicPopulation = properties.pop_nhpi_nh;
                break;
            case Constants.MAP_FILTER_OTHER_DENSITY:
                demographicPopulation = properties.pop_other_nh;
                break;
            case Constants.MAP_FILTER_BIRACIAL_DENSITY:
                demographicPopulation = properties.pop_2more_nh;
                break;
        }

        return demographicPopulation / properties.pop_total;
    }
}