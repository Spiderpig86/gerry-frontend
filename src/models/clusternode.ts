import { Precinct } from './';

/**
 * Stores cluster information for intermediate and original congressional districts.
 * 
 * @export
 * @interface ClusterNode
 */
export interface ClusterNode {

    name: string;
    id: string;
    precinctNodes: Map<string, Precinct>;

}