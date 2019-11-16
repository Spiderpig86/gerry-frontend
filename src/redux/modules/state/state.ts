/** 
 * Main container for application state. Only a single class to avoid fragmentation of data store.
 */
import * as Constants from '../../../config/constants';

import { PhaseZeroArgs, IPrecinct, MapFilterEnum, ViewLevelEnum, ElectionEnum, ICluster, PhaseOneArgs, CompactnessEnum, DemographicEnum, StateEnum, FilterArgs } from '../../../models';
import { PoliticalFairnessEnum } from '../../../models';
import { PrecinctService } from '../../../libs/state-service';

const SET_STATE = 'SET_STATE';
const SET_PRECINCTS = 'SET_PRECINCTS';
const SET_PRECINCT_MAP = 'SET_PRECINCT_MAP';
const SET_MAP_FILTER = 'SET_MAP_FILTER';
const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';

const SET_PHASE_ZERO_ARGS = 'SET_PHASE_ZERO_ARGS';
const SET_PHASE_ONE_ARGS = 'SET_PHASE_ONE_ARGS';

export const setSelectedState = (oldState: string, state: string) => {
    return (dispatch: any) => {
        if (oldState === state) {
            return;
        }
        dispatch(selectState(state));
        dispatch(setPrecinctMap(new Map<string, IPrecinct>()));
        dispatch(() => new PrecinctService(state as StateEnum, dispatch));
    }
}

export const setMapFilter = (filter: string) => {
    return (dispatch: any) => {
        dispatch(setFilter(filter));
    }
}

export const setMapLevel = (level: string) => {
    return (dispatch: any) => {
        dispatch(setLevel(level));
    }
}

export const setPrecinctData = (precincts: any) => {
    return (dispatch: any) => {
        dispatch(setPrecincts(precincts));
    }
}

export const selectState = (selectedState: string) => {
    return {
        type: SET_STATE,
        selectedState
    }
}

export const setPrecincts = (precincts: any) => {
    return {
        type: SET_PRECINCTS,
        precincts
    }
}

export const setPrecinctMap = (precinctMap: Map<string, IPrecinct>) => {
    return {
        type: SET_PRECINCT_MAP,
        precinctMap
    }
}

export const setFilter = (filter: string) => {
    return {
        type: SET_MAP_FILTER,
        filter
    }
}

export const setLevel = (level: string) => {
    return {
        type: SET_VIEW_LEVEL,
        level
    }
}

export const setPhaseZeroArgs = (phaseZeroArgs: PhaseZeroArgs) => {
    return {
        type: SET_PHASE_ZERO_ARGS,
        phaseZeroArgs
    }
}

export const setPhaseOneArgs = (phaseOneArgs: PhaseOneArgs) => {
    return {
        type: SET_PHASE_ONE_ARGS,
        phaseOneArgs
    }
}

export interface State {
    selectedState: string;
    precincts: any;
    precinctMap: Map<string, IPrecinct>;
    clusterMap: Map<string, ICluster>;
    oldClusterMap: Map<string, ICluster>;
    phaseZeroArgs: PhaseZeroArgs;
    phaseOneArgs: PhaseOneArgs;
    filterArgs: FilterArgs;
};

const initialState: State = {
    selectedState: 'N/A',
    precincts: Constants.EMPTY_PRECINCTS,
    precinctMap: new Map<string, IPrecinct>(),
    clusterMap: new Map<string, ICluster>(),
    oldClusterMap: new Map<string, ICluster>(),
    phaseZeroArgs: {
        demographicThreshold: 0.5,
        selectedElection: ElectionEnum.PRES_16,
        partyThreshold: 0.5
    },
    phaseOneArgs: {
        numDistricts: 5,
        electionData: ElectionEnum.PRES_16,
        minPopulationPercent: .5,
        maxPopulationPercent: .5,
        selectedDemographics: new Set<DemographicEnum>(),
        compactnessOption: CompactnessEnum.POLSBY_POPPER,
        politicalFairnessOption: PoliticalFairnessEnum.EFFICIENCY_GAP,
        objectivePopulationEquality: 0.0,
        objectiveCompactness: 0.0,
        objectivePartisanFairness: 0.0,
        objectiveContiguity: 0.0,
        intermediateResults: false
    },
    filterArgs: {
        viewLevel: ViewLevelEnum.PRECINCTS,
        mapFilter: MapFilterEnum.DEFAULT
    }
}

export const stateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATE:
            return {
                ...state,
                selectedState: action.selectedState
            }
        case SET_PRECINCTS:
            return {
                ...state,
                precincts: action.precincts
            }
        case SET_PRECINCT_MAP:
            return {
                ...state,
                precinctMap: action.precinctMap
            }
        case SET_MAP_FILTER:
            return {
                ...state,
                filterArgs: {
                    ...state.filterArgs,
                    mapFilter: action.filter
                }
            }
        case SET_VIEW_LEVEL:
            return {
                ...state,
                filterArgs: {
                    ...state.filterArgs,
                    viewLevel: action.level
                }
            }
        case SET_PHASE_ZERO_ARGS:
            return {
                ...state,
                phaseZeroArgs: action.phaseZeroArgs
            }
        case SET_PHASE_ONE_ARGS:
            return  {
                ...state,
                phaseOneArgs: action.phaseOneArgs
            }
        default:
            return state;
    }
}