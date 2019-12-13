import Axios from 'axios';

import * as Constants from '../../config/constants';

import { PhaseZeroArgs, ResponseEnum, PartyEnum, PhaseZeroResult, DemographicEnum, PrecinctBlocSummary } from '../../models';
import { formatResponse } from '../functions/response';

export class PhaseZeroService {

    public async runPhaseZero(phaseZeroArgs: PhaseZeroArgs): Promise<any> {
        try {
            const response = await Axios.post(`${Constants.APP_API}/algorithm/phase0`, {
                ...phaseZeroArgs,
                voteThreshold: (phaseZeroArgs.voteThreshold * 1.0) / 100,
                populationThreshold: (phaseZeroArgs.populationThreshold * 1.0) / 100,
            });
            return formatResponse(ResponseEnum.OK, this.toPhaseZeroResult(response.data.precinctBlocs));
        } catch (e) {
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