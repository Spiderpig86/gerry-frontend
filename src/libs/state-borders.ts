import Axios from 'axios';
import { StateEnum, ResponseEnum } from '../models';
import { formatResponse } from './functions/response';

export class StateBorderService {
    public async fetchStateBorder(state: StateEnum): Promise<any> {
        try {
            const data = await Axios.get(`https://raw.githubusercontent.com/Spiderpig86/US-Congressional-Districts/master/${state}.geojson`);
            return formatResponse(ResponseEnum.OK, data.data, {state});
        } catch (e) {
            return formatResponse(ResponseEnum.ERROR, null, [state]);
        }
    }
}