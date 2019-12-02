import { PrecinctProperties } from '../../models';

/**
 * Takes a given precinct's properties and generates key for mapping.
 *
 * @param properties - properties object associated with precinct.
 */
export function hashPrecinct(properties: PrecinctProperties) {
    return properties.precinct_id;
}
