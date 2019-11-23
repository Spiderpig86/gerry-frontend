import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as Constants from '../config/constants';

import { PhaseZeroArgs, ResponseEnum, PartyEnum, PhaseZeroResult, DemographicEnum } from '../models';
import { formatResponse } from './functions/response';
import { map } from 'leaflet';

const mock = Axios.create();
const MockAxios = new MockAdapter(mock);

export class PhaseZeroService {
    public async runPhaseZero(phaseZeroArgs: PhaseZeroArgs) {
        try {
            const response = await mock.post(`${Constants.APP_API}/phase0`, {
                phaseZeroArgs
            });
            console.log(response);
            return formatResponse(ResponseEnum.OK, response.data.blocData );
        } catch (e) {
            console.log(e);
            return formatResponse(ResponseEnum.ERROR, null);
        }
    }
}

// CODE FOR DEMONSTRATION PURPOSES ONLY
MockAxios.onPost(`${Constants.APP_API}/phase0`).reply(200, {
    blocData: generatePhaseZeroResult()
});

function generatePhaseZeroResult() {
    const data: Map<PartyEnum, PhaseZeroResult[]> = new Map();
    const demographics = [DemographicEnum.WHITE, DemographicEnum.BLACK, DemographicEnum.HISPANIC, DemographicEnum.ASIAN, DemographicEnum.NATIVE_AMERICAN, DemographicEnum.PACIFIC_ISLANDER, DemographicEnum.OTHER, DemographicEnum.BIRACIAL];
    for (let party of [PartyEnum.DEMOCRATIC, PartyEnum.REPUBLICAN, PartyEnum.OTHER]) {
        const demographicCount = Math.floor(Math.random() * demographics.length + 1);
        data[party] = [];
        const shuffled = demographics.sort(() => 0.5 - Math.random());
        for (let i = 0; i < demographicCount; i++) {
            const demographic = shuffled[i];
            data[party].push(generatePhaseZeroResultItem(party, demographic));
        }
    }
    return data;
}

function generatePhaseZeroResultItem(party, demographic): PhaseZeroResult {
    const precinctCount = Math.round(Math.random() * 180 + 1);
    const meanPopulationPercentage = Math.random() * 30 + 70;
    const meanPartyPercentage = Math.random() * 30 + 70;
    const meanPrecinctPop = Math.random() * 1500 + 30;
    const minPrecinctPop = Math.round(meanPrecinctPop * 0.15);
    const maxPrecinctPop = Math.round(meanPrecinctPop * 1.85);

    return {
        precinctCount,
        partyType: party,
        demographicType: demographic,
        meanPartyPercentage,
        meanDemographicPercentage: meanPopulationPercentage,
        minPrecinctPop,
        maxPrecinctPop,
        meanPrecinctPop
    }
}