import { ElectionEnum } from '../enums';

export interface PhaseZeroArgs {
    demographicThreshold: number;
    selectedElection: ElectionEnum;
    partyThreshold: number;
}
