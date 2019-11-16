import Axios from 'axios';

/**
 * Test class for fetching geojson for state outlines
 */
export enum States {
    CA = 'CA',
    MI = 'MI',
    RI = 'RI',
    UT = 'UT',
    VA = 'VA'
}

export class StateBorderService {
    public async fetchStateBorder(state: States): Promise<any> {
        try {
            const data = await Axios.get(`https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/${state}/shape.geojson`);
            return {
                status: 'OK',
                state,
                data: {
                    type: 'Feature',
                    geometry: data.data,
                    state
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