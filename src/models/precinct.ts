import { Properties } from './properties';

/**
 * Interface for specifying how precinct objects should look.
 * 
 * @export
 * @interface IPrecinct
 */
export interface IPrecinct {
    
    geometry: any;
    originalCdId: any;
    newCdId: any;
    properties: Properties;

}