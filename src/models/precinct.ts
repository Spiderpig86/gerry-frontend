import { Properties } from './properties';

/**
 * Interface for specifying how precinct objects should look.
 * 
 * @export
 * @interface IPrecinct
 */
export interface IPrecinct {
    
    geometry: any;
    originalCd: any;
    newCd: any;
    properties: Properties;

}