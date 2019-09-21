import Axios from 'axios';

/**
 * Test class for fetching geojson for state outlines
 */
export enum States {
    CA = 'CA',
    UT = 'UT',
    VA = 'VA'
}

export class StateBordersApi {

    public async fetchStateBorder(state: States): Promise<any> {
        try {
            const data = await Axios.get(`https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/${state}/shape.geojson`);
            return {
                status: 'OK',
                state,
                data: {
                    type: 'Feature',
                    geometry: data.data
                }
            };
        } catch (e) {
            return {
                status: 'ERR',
                state,
                data: null
            };
        }
    }

}