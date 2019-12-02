import { IDemographics, IVoteData } from '../../models';

export class ModelMapper {

    public toIDemographic(demographic: any): IDemographics {
        return {
            White: demographic.pop_white_nh || 0,
            AfricanAmerican: demographic.pop_black_nh || 0,
            Asian: demographic.pop_asian_nh || 0,
            Hispanic: demographic.pop_hispanic || 0,
            PacificIslander: demographic.pop_nhpi_nh || 0,
            NativeAmerican: demographic.pop_amin_nh || 0,
            Biracial: demographic.pop_2more_nh || 0,
            Other: demographic.pop_other_nh || 0
        }
    }

    public toIVote(votes: any): IVoteData {
        return {
            democraticVotes: votes.democratic || 0,
            republicanVotes: votes.republican || 0,
            otherVotes: votes.other || 0
        }
    }

}