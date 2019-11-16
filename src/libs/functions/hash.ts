import { Properties } from '../../models';

/**
 * Takes a given precinct's properties and generates key for mapping.
 *
 * @param properties - properties object associated with precinct.
 */
export function hashPrecinct(properties: Properties) {
    return `${properties.precinct_name}#${properties.county_name}`;
}
