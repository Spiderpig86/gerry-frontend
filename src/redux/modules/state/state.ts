/**
 * Main container for application state. Only a single class to avoid fragmentation of data store.
 */
import * as Constants from '../../../config/constants';
import { store } from '../../../index';

import {
    PhaseZeroArgs,
    IPrecinct,
    MapFilterEnum,
    ViewLevelEnum,
    ElectionEnum,
    ICluster,
    PhaseOneArgs,
    CompactnessEnum,
    DemographicEnum,
    StateEnum,
    FilterArgs,
    AlgorithmEnum,
    PhaseZeroResult,
    PartyEnum,
    PoliticalFairnessEnum,
    PopulationEqualityEnum,
    PhaseOneMajMinPairsEnum,
    PhaseTwoDepthEnum,
    PhaseTwoArgs,
    PhaseTwoMeasuresEnum,
    PhaseTwoPrecinctMoveEnum,
    AlgorithmRunEnum,
    PhaseOneOtherPairsEnum,
    PhaseOneStopEnum,
    ClusterProperties
} from '../../../models';
import { PrecinctService } from '../../../libs/precinct-service';
import { PhaseOneService } from '../../../libs/algorithms/phase-one-service';
import { PhaseTwoService } from '../../../libs/algorithms/phase-two-service';

const SET_STATE = 'SET_STATE';
const SET_STATE_DATA = 'SET_STATE_DATA';
const SET_PRECINCTS = 'SET_PRECINCTS';
const SET_PRECINCT_MAP = 'SET_PRECINCT_MAP';
const SET_OLD_CLUSTERS = 'SET_OLD_CLUSTERS';
const SET_NEW_CLUSTERS = 'SET_NEW_CLUSTERS';
const SET_MAP_FILTER = 'SET_MAP_FILTER';
const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';
const SET_PHASE_ZERO_ARGS = 'SET_PHASE_ZERO_ARGS';
const SET_PHASE_ZERO_RESULTS = 'SET_PHASE_ZERO_RESULTS';
const SET_PHASE_ONE_ARGS = 'SET_PHASE_ONE_ARGS';
const SET_PHASE_TWO_ARGS = 'SET_PHASE_TWO_ARGS';
const SET_ALGORITHM_PHASE = 'SET_ALGORITHM_PHASE';
const SET_PHASE_ONE_SERVICE = 'SET_PHASE_ONE_SERVICE';
const SET_PHASE_TWO_SERVICE = 'SET_PHASE_TWO_SERVICE';
const SET_LOGS = 'SET_LOGS';
const SET_PZERO_HIGHLIGHTED_PRECINCTS = 'SET_PZERO_HIGHLIGHTED_PRECINCTS';

export const setSelectedStateCreator = (oldState: StateEnum, state: StateEnum) => {
    return async (dispatch: any) => {
        if (oldState === state) {
            return;
        }
        dispatch(setPrecinctMap(new Map<string, IPrecinct>()));
        dispatch(setStateData(null));
        dispatch(setOldClusters(new Map<string, ICluster>()));
        dispatch(
            setPhaseZeroArgs({
                ...initialState.phaseZeroArgs,
                stateType: state
            })
        );
        dispatch(
            setPhaseOneArgs({
                ...initialState.phaseOneArgs,
                stateType: state
            })
        );
        dispatch(setPhaseZeroResults(null));
        dispatch(setPZeroHighlightedPrecincts(new Set<String>()));

        const service = new PrecinctService(state, dispatch);
        await service.getStateStatistics(state);
    };
};

export const setPhaseZeroArgsCreator = (phaseZeroArgs: PhaseZeroArgs) => {
    return async (dispatch: any) => {
        dispatch(setPhaseZeroArgs(phaseZeroArgs));
        dispatch(
            setPhaseOneArgs({
                ...initialState.phaseOneArgs,
                electionType: phaseZeroArgs.electionType
            })
        );
        dispatch(
            setPhaseTwoArgs({
                ...initialState.phaseTwoArgs,
                electionData: phaseZeroArgs.electionType
            })
        );
    };
};

export const setPhaseOneArgsCreator = (phaseOneArgs: PhaseOneArgs) => {
    return async (dispatch: any) => {
        dispatch(setPhaseOneArgs(phaseOneArgs));
        dispatch(
            setPhaseTwoArgs({
                ...initialState.phaseTwoArgs,
                stateType: phaseOneArgs.stateType,
                electionData: phaseOneArgs.electionType,
                demographicTypes: phaseOneArgs.demographicTypes,
                upperBound: phaseOneArgs.upperBound,
                lowerBound: phaseOneArgs.lowerBound
            })
        );
    };
};

export const setPhaseOneJobId = (jobId: string) => {
    return async (dispatch: any) => {
        
        dispatch(setPhaseOneArgs({
            ...store.getState().stateReducer.phaseOneArgs,
            jobId
        }));
    }
}

export const setMapFilterCreator = (filter: string) => {
    return (dispatch: any) => {
        dispatch(setFilter(filter));
    };
};

export const setMapLevelCreator = (level: string) => {
    return (dispatch: any) => {
        dispatch(setLevel(level));
    };
};

export const setPrecinctDataCreator = (precincts: any) => {
    return (dispatch: any) => {
        dispatch(setPrecincts(precincts));
    };
};

export const setPhaseOneServiceCreator = (phaseOneService: PhaseOneService) => {
    return (dispatch: any) => {
        phaseOneService.setDispatch(dispatch);
        dispatch(setPhaseOneService(phaseOneService));
    };
};

export const setPhaseTwoServiceCreator = (phaseTwoService: PhaseTwoService) => {
    return (dispatch: any) => {
        phaseTwoService.setDispatch(dispatch);
        dispatch(setPhaseTwoService(phaseTwoService));
    };
};

export const selectState = (selectedState: string) => {
    return {
        type: SET_STATE,
        selectedState
    };
};

export const setStateData = (stateData: ICluster) => {
    return {
        type: SET_STATE_DATA,
        stateData
    };
};

export const setPrecincts = (precincts: any) => {
    return {
        type: SET_PRECINCTS,
        precincts
    };
};

export const setPrecinctMap = (precinctMap: Map<string, IPrecinct>) => {
    return {
        type: SET_PRECINCT_MAP,
        precinctMap
    };
};

export const setFilter = (filter: string) => {
    return {
        type: SET_MAP_FILTER,
        filter
    };
};

export const setLevel = (level: string) => {
    return {
        type: SET_VIEW_LEVEL,
        level
    };
};

export const setPhaseZeroArgs = (phaseZeroArgs: PhaseZeroArgs) => {
    return {
        type: SET_PHASE_ZERO_ARGS,
        phaseZeroArgs
    };
};

export const setPhaseZeroResults = (phaseZeroResults: PhaseZeroResult) => {
    return {
        type: SET_PHASE_ZERO_RESULTS,
        phaseZeroResults
    };
};

export const setPhaseOneArgs = (phaseOneArgs: PhaseOneArgs) => {
    return {
        type: SET_PHASE_ONE_ARGS,
        phaseOneArgs
    };
};

export const setPhaseTwoArgs = (phaseTwoArgs: PhaseTwoArgs) => {
    return {
        type: SET_PHASE_TWO_ARGS,
        phaseTwoArgs
    };
};

export const setAlgorithmPhase = (algorithmState: AlgorithmEnum) => {
    return {
        type: SET_ALGORITHM_PHASE,
        algorithmState
    };
};

export const setOldClusters = (oldClusters: Map<string, ICluster>) => {
    return {
        type: SET_OLD_CLUSTERS,
        oldClusters
    };
};

export const setNewClusters = (newClusters: Map<string, ICluster>) => {
    return {
        type: SET_NEW_CLUSTERS,
        newClusters
    };
};

export const setPhaseOneService = (phaseOneService: PhaseOneService) => {
    return {
        type: SET_PHASE_ONE_SERVICE,
        phaseOneService
    };
};

export const setPhaseTwoService = (phaseTwoService: PhaseTwoService) => {
    return {
        type: SET_PHASE_TWO_SERVICE,
        phaseTwoService
    };
};

export const setLogs = (logs: string[]) => {
    return {
        type: SET_LOGS,
        logs
    };
};

export const appendLogs = (newLogs: string[]) => {
    const logs = store.getState().stateReducer.logs.concat(newLogs);
    return {
        type: SET_LOGS,
        logs: logs
    };
};

export const setPZeroHighlightedPrecincts = (highlightedPrecincts: Set<String>) => {
    return {
        type: SET_PZERO_HIGHLIGHTED_PRECINCTS,
        highlightedPrecincts
    };
};

export interface State {
    selectedState: StateEnum;
    stateData: ICluster;
    stateId: string;
    precincts: any;
    precinctMap: Map<string, IPrecinct>;
    algorithmState: AlgorithmEnum;
    oldClusters: Map<string, ICluster>;
    newClusters: Map<string, ICluster>;
    clusterProperties: ClusterProperties;
    phaseZeroArgs: PhaseZeroArgs;
    phaseZeroResults: PhaseZeroResult;
    phaseOneArgs: PhaseOneArgs;
    phaseTwoArgs: PhaseTwoArgs;
    filterArgs: FilterArgs;
    algorithmPhase: AlgorithmEnum;
    phaseOneService: PhaseOneService;
    logs: string[];
    highlightedPrecincts: Set<String>;
}

const initialState: State = {
    selectedState: StateEnum.NOT_SET,
    stateData: null,
    stateId: null,
    precincts: Constants.EMPTY_PRECINCTS,
    precinctMap: new Map<string, IPrecinct>(),
    algorithmState: AlgorithmEnum.PHASE_0_1,
    oldClusters: new Map<string, ICluster>(),
    newClusters: new Map<string, ICluster>(),
    clusterProperties: null,
    phaseZeroArgs: {
        populationThreshold: Constants.DEFAULT_THRESHOLD,
        electionType: ElectionEnum.PRES_16,
        voteThreshold: Constants.DEFAULT_THRESHOLD,
        stateType: StateEnum.NOT_SET
    },
    phaseZeroResults: null,
    phaseOneArgs: {
        stateType: StateEnum.NOT_SET,
        electionType: ElectionEnum.PRES_16,
        numDistricts: Constants.DEFAULT_NUM_DISTRICTS,
        demographicTypes: new Set<DemographicEnum>(),
        lowerBound: Constants.DEFAULT_POP_PRECENT_MIN,
        upperBound: Constants.DEFAULT_POP_PRECENT_MAX,
        algRunType: AlgorithmRunEnum.TO_COMPLETION,
        majMinPairsHeuristic: PhaseOneMajMinPairsEnum.STANDARD,
        otherPairsHeuristic: PhaseOneOtherPairsEnum.STANDARD,
        stopHeuristic: PhaseOneStopEnum.JOIN_SMALLEST,
        jobId: null
    },
    phaseTwoArgs: {
        stateType: StateEnum.NOT_SET,
        electionData: ElectionEnum.PRES_16,
        stateId: '',
        demographicTypes: new Set<DemographicEnum>(),
        upperBound: Constants.DEFAULT_POP_PRECENT_MIN,
        lowerBound: Constants.DEFAULT_POP_PRECENT_MAX,
        epsilon: 0.001,
        weights: new Map([
            [PhaseTwoMeasuresEnum.POPULATION_EQUALITY, 0],
            [PhaseTwoMeasuresEnum.COMPACTNESS, 0],
            [PhaseTwoMeasuresEnum.PARTISAN_FAIRNESS, 0],
            [PhaseTwoMeasuresEnum.POLITICAL_COMPETITIVENESS, 0],
            [PhaseTwoMeasuresEnum.POPULATION_HOMOGENEITY, 0]
        ]),
        phaseTwoDepthHeuristic: PhaseTwoDepthEnum.STANDARD,
        precinctMoveHeuristic: PhaseTwoPrecinctMoveEnum.RANDOM,
        numRetries: Constants.DEFAULT_PHASE_TWO_RETRIES,
        compactnessOption: CompactnessEnum.GRAPH_THEORETICAL,
        politicalFairnessOption: PoliticalFairnessEnum.EFFICIENCY_GAP,
        populationEqualityOption: PopulationEqualityEnum.IDEAL
    },
    filterArgs: {
        viewLevel: ViewLevelEnum.OLD_DISTRICTS,
        mapFilter: MapFilterEnum.DEFAULT
    },
    algorithmPhase: AlgorithmEnum.PHASE_0_1,
    phaseOneService: null,
    logs: [],
    highlightedPrecincts: new Set<String>()
};

export const stateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATE:
            return {
                ...state,
                selectedState: action.selectedState
            };
        case SET_STATE_DATA:
            return {
                ...state,
                stateData: action.stateData
            };
        case SET_PRECINCTS:
            return {
                ...state,
                precincts: action.precincts
            };
        case SET_PRECINCT_MAP:
            return {
                ...state,
                precinctMap: action.precinctMap
            };
        case SET_MAP_FILTER:
            return {
                ...state,
                filterArgs: {
                    ...state.filterArgs,
                    mapFilter: action.filter
                }
            };
        case SET_VIEW_LEVEL:
            return {
                ...state,
                filterArgs: {
                    ...state.filterArgs,
                    viewLevel: action.level
                }
            };
        case SET_ALGORITHM_PHASE:
            return {
                ...state,
                algorithmState: action.algorithmState
            };
        case SET_PHASE_ZERO_ARGS:
            return {
                ...state,
                phaseZeroArgs: action.phaseZeroArgs
            };
        case SET_PHASE_ZERO_RESULTS:
            return {
                ...state,
                phaseZeroResults: action.phaseZeroResults
            };
        case SET_PHASE_ONE_ARGS:
            return {
                ...state,
                phaseOneArgs: action.phaseOneArgs
            };
        case SET_PHASE_TWO_ARGS:
            return {
                ...state,
                phaseTwoArgs: action.phaseTwoArgs
            };
        case SET_OLD_CLUSTERS:
            return {
                ...state,
                oldClusters: action.oldClusters
            };
        case SET_NEW_CLUSTERS:
            return {
                ...state,
                newClusters: action.newClusters
            };
        case SET_PHASE_ONE_SERVICE:
            return {
                ...state,
                phaseOneService: action.phaseOneService
            };
        case SET_LOGS:
            return {
                ...state,
                logs: action.logs
            };
        case SET_PZERO_HIGHLIGHTED_PRECINCTS:
            return {
                ...state,
                highlightedPrecincts: action.highlightedPrecincts
            };
        default:
            return state;
    }
};
