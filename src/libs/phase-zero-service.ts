import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as Constants from '../config/constants';

import { PhaseZeroArgs, ResponseEnum } from '../models';
import { formatResponse } from './functions/response';

const mock = Axios.create();
const MockAxios = new MockAdapter(mock);

// CODE FOR DEMONSTRATION PURPOSES ONLY
MockAxios.onPost(`${Constants.APP_API}/phase0`).reply(200, {
    blocData: [1, 2, 3, 4, 5].map((e: any, i: number) => {
        const demographicPercentage = Math.random() * 30 + 70;
        const partyPercentage = Math.random() * 30 + 70;
        const demographics = ['White', 'African American', 'Hispanic', 'Asian', 'Native American', 'Pacific Islander'];
        const parties = ['Democratic', 'Republican'];
        const demographic = demographics[~~(Math.random() * parties.length)];
        const party = parties[~~(Math.random() * parties.length)];
        return {i, demographic, demographicPercentage, party, partyPercentage};
    })
});

export class PhaseZeroService {
    public async fetchPrecinctBlocs(phaseZeroArgs: PhaseZeroArgs) {
        try {
            const response = await mock.post(`${Constants.APP_API}/phase0`, {
                phaseZeroArgs
            });
            return formatResponse(ResponseEnum.OK, response.data.blocData );
        } catch (e) {
            console.log(e);
            return formatResponse(ResponseEnum.ERROR, null);
        }
    }
}