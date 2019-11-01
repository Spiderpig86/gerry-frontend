import * as Constants from '../../../config/constants';
import { StateBordersApi } from '../../../libs/state-borders';
import { PhaseZeroArgs, IPrecinct, MapFilterEnum, ViewLevelEnum, ElectionEnum, ICluster } from '../../../models';
import { hashPrecinct } from '../../../libs/hash';

const SET_STATE = 'SET_STATE';
const SET_PRECINCTS = 'SET_PRECINCTS';
const SET_PRECINCT_MAP = 'SET_PRECINCT_MAP';
const SET_MAP_FILTER = 'SET_MAP_FILTER';
const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';

const SET_PHASE_ZERO_ARGS = 'SET_PHASE_ZERO_ARGS';
const SET_PHASE_ONE_ARGS = 'SET_PHASE_ONE_ARGS';

export const setSelectedState = (oldState: string, state: string) => {
    return (dispatch: any) => {
        // Selecting already loaded state
        if (oldState === state) {
            return;
        }

        // Fetch state data
        const statePopulator = new StateBordersApi();
        dispatch(selectState(state));
        statePopulator.fetchPrecincts(state).then(precincts => {
            console.log(precincts);
            const shapeData: any[] = precincts.data.geometry.features;
            const map = new Map<string, IPrecinct>();
            for (const shape of shapeData) {
                map.set(hashPrecinct(shape.properties), {originalCdId: shape.properties.cd, ...shape});
            }
            dispatch(setPrecincts(null));
            dispatch(setPrecincts(precincts.data.geometry));
            dispatch(setPrecinctMap(map));
        });
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

interface State {
    selectedState: string;
    precincts: any;
    precinctMap: Map<string, IPrecinct>;
    clusterMap: Map<string, ICluster>;
    oldClusterMap: Map<string, ICluster>;
    filter: MapFilterEnum;
    level: ViewLevelEnum;
    phaseZeroArgs: PhaseZeroArgs
};

const initialState: State = {
    selectedState: 'N/A',
    precincts: null,
    precinctMap: new Map<string, IPrecinct>(),
    clusterMap: new Map<string, ICluster>(),
    oldClusterMap: new Map<string, ICluster>(),
    filter: MapFilterEnum.DEFAULT,
    level: ViewLevelEnum.PRECINCTS,
    phaseZeroArgs: {
        demographicThreshold: 0.5,
        selectedElection: ElectionEnum.PRES_16,
        partyThreshold: 0.5
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
                filter: action.filter
            }
        case SET_VIEW_LEVEL:
            return {
                ...state,
                level: action.level
            }
        case SET_PHASE_ZERO_ARGS:
            return {
                ...state,
                phaseZeroArgs: action.phaseZeroArgs
            }
        default:
            return state;
    }
}