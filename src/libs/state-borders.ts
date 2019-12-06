import Axios from 'axios';
import { StateEnum, ResponseEnum } from '../models';
import { formatResponse } from './functions/response';

export class StateBorderService {
    public async fetchStateBorder(state: StateEnum): Promise<any> {
        try {
            const data = await Axios.get(`https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/${state}/shape.geojson`);
            return formatResponse(ResponseEnum.OK, {
                type: 'Feature',
                geometry: data.data,
                state
            }, {state});
        } catch (e) {
            return formatResponse(ResponseEnum.ERROR, null, [state]);
        }
    }
}