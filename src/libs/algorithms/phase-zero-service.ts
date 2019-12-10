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
            const response = await Axios.post(`${Constants.APP_API}/algorithm/phase0`, {
                ...phaseZeroArgs,
                voteThreshold: (phaseZeroArgs.voteThreshold * 1.0) / 100,
                populationThreshold: (phaseZeroArgs.populationThreshold * 1.0) / 100,
            });
            console.log(response);
            return formatResponse(ResponseEnum.OK, this.toPhaseZeroResult(response.data.precinctBlocs));
        } catch (e) {
            console.log(e);
            return formatResponse(ResponseEnum.ERROR, null);
        }
    }

    private toPhaseZeroResult(precinctBlocs: any): PhaseZeroResult {
        console.log(precinctBlocs)
        const result: PhaseZeroResult = {
            precinctBlocs: [],
            totalVoteBlocCount: 0
        }

        for (const party of Object.values(PartyEnum)) {
            console.log(party, precinctBlocs[party]);
            const summaries: PrecinctBlocSummary[] = precinctBlocs[party];

            if (!summaries) {
                continue;
            }

            // Iterate over all the keys in the object for each party
            for (const summary of summaries) {
                result.precinctBlocs.push({
                    ...summary,
                    partyType: party
                });
                result.totalVoteBlocCount += summary.votingBlocCount;
            }
        }

        return result;
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
        meanDemographicPercentage: meanPopulationPercentage,
        precinctNames: []
    }
}