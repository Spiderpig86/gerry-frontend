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

    public async fetchPrecincts(state: string): Promise<any> {

        if (state === 'UT') {
            try {
                const data = await Axios.get(`./api/UT2.json`);
                console.log(data);
                return {
                    status: 'OK',
                    data: {
                        type: 'Feature',
                        geometry: data.data
                    }
                };
            } catch (e) {
                console.log(e);
                return {
                    status: 'ERR',
                    data: {
                        geometry: null
                    }
                };
            }
        } else {
            return {
                status: 'ERR',
                data: {
                    geometry: null
                }
            };
        }
    }

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