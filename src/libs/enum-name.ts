import { ElectionEnum, DemographicEnum, StateEnum, AlgorithmEnum } from '../models';

export class EnumNameMapper {
    private static electionNames: Map<ElectionEnum, string> = new Map([
        [ElectionEnum.PRES_16, 'Presidential 2016'],
        [ElectionEnum.HOUSE_16, 'Congressional 2016'],
        [ElectionEnum.HOUSE_18, 'Congressional 2018']
    ]);
    private static demographicNames: Map<DemographicEnum, string> = new Map([
        [DemographicEnum.WHITE, 'Non-Hispanic White'],
        [DemographicEnum.BLACK, 'African American'],
        [DemographicEnum.ASIAN, 'Asian'],
        [DemographicEnum.HISPANIC, 'Hispanic'],
        [DemographicEnum.PACIFIC_ISLANDER, 'Pacific Islander'],
        [DemographicEnum.NATIVE_AMERICAN, 'Native American'],
        [DemographicEnum.BIRACIAL, 'Biracial'],
        [DemographicEnum.OTHER, 'Other']
    ]);
    private static stateNames: Map<StateEnum, string> = new Map([
        [StateEnum.CA, 'California'],
        [StateEnum.UT, 'Utah'],
        [StateEnum.VA, 'Virginia'],
        [StateEnum.NOT_SET, 'N/A']
    ]);
    private static algorithmNames: Map<AlgorithmEnum, string> = new Map([
        [AlgorithmEnum.PHASE_0_1, 'Phase 1'],
        [AlgorithmEnum.PHASE_2, 'Phase 2']
    ])

    public static getElectionName(election: ElectionEnum): string {
        return this.electionNames.get(election);
    }
    
    public static getDemographicName(demographic: DemographicEnum): string {
        return this.demographicNames.get(demographic);
    }
    
    public static getStateName(state: StateEnum): string {
        return this.stateNames.get(state);
    }

    public static getAlgorithmName(phase: AlgorithmEnum): string {
        return this.algorithmNames.get(phase);
    }
}
