import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as Constants from '../../config/constants';

import { PhaseZeroArgs, ResponseEnum, PartyEnum, PhaseZeroResult, DemographicEnum, PrecinctBlocSummary } from '../../models';
import { formatResponse } from '../functions/response';

const mock = Axios.create();
const MockAxios = new MockAdapter(mock);

export class PhaseZeroService {
    public async runPhaseZero(phaseZeroArgs: PhaseZeroArgs): Promise<any> {
        try {
            const response = await mock.post(`${Constants.APP_API}/algorithm/phase0`, {
                phaseZeroArgs
            });
            return formatResponse(ResponseEnum.OK, {...response.data.blocData} );
        } catch (e) {
            return formatResponse(ResponseEnum.ERROR, null);
        }
    }
}

// CODE FOR DEMONSTRATION PURPOSES ONLY
MockAxios.onPost(`${Constants.APP_API}/algorithm/phase0`).reply(200, {
    blocData: generatePhaseZeroResult()
});

function generatePhaseZeroResult() {
    const data = [];
    const demographics = [DemographicEnum.WHITE, DemographicEnum.BLACK, DemographicEnum.HISPANIC, DemographicEnum.ASIAN, DemographicEnum.NATIVE_AMERICAN, DemographicEnum.PACIFIC_ISLANDER, DemographicEnum.OTHER, DemographicEnum.BIRACIAL];
    let total = 0;
    for (let party of [PartyEnum.DEMOCRATIC, PartyEnum.REPUBLICAN, PartyEnum.OTHER]) {
        const demographicCount = Math.floor(Math.random() * demographics.length + 1);
        const shuffled = demographics.sort(() => 0.5 - Math.random());
        for (let i = 0; i < demographicCount; i++) {
            const demographic = shuffled[i];
            const precinctBlocSummary = generatePhaseZeroResultItem(party, demographic);
            data.push(precinctBlocSummary);
            total += precinctBlocSummary.votingBlocCount;
        }
    }
    return { precinctBlocs: data, totalVoteBlocCount: total };
}

function generatePhaseZeroResultItem(party, demographic): PrecinctBlocSummary {
    const precinctCount = Math.round(Math.random() * 180 + 1);
    const meanPopulationPercentage = Math.random() * 30 + 70;
    const meanPartyPercentage = Math.random() * 30 + 70;

    return {
        votingBlocCount: precinctCount,
        partyType: party,
        demographicType: demographic,
        meanPartyPercentage,
        meanDemographicPercentage: meanPopulationPercentage
    }
}