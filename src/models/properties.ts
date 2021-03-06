/**
 * Directly maps to geojson of precinct.
 */
export interface PrecinctProperties {
    cd: number;
    county_name: string;
    district_number: string;
    loc_prec: string;
    pop_2more_h: number;
    pop_2more_nh: number;
    pop_2more_voting: number;
    pop_amin_h: number;
    pop_amin_voting: number;
    pop_asian_h: number;
    pop_asian_nh: number;
    pop_asian_voting: number;
    pop_black_h: number;
    pop_black_nh: number;
    pop_black_voting: number;
    pop_hispanic: number;
    pop_hispanic_voting: number;
    pop_nhpi_h: number;
    pop_nhpi_nh: number;
    pop_nhpi_voting: number;
    pop_other_h: number;
    pop_other_nh: number;
    pop_other_voting: number;
    pop_total: number;
    pop_total_voting: number;
    pop_white_h: number;
    pop_white_nh: number;
    pop_white_voting: number;
    precinct_id: string;
    precinct_name: string;
    v16_dpres: string;
    v16_rpres: string;
    v16_ipres: string;
    v16_opres: string;
    v16_dhouse: string;
    v16_rhouse: string;
    v16_ohouse: string;
    v18_dsenate: string;
    v18_isenate: string;
    v18_dhouse: string;
    v18_rhouse: string;
    v18_ohouse: string;
    v18_rsenate: string;

    [x: string]: any;
}
