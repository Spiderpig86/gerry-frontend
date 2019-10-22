import * as Constants from '../../../config/constants';
import { StateBordersApi } from '../../../libs/state-borders';
import { PhaseZeroArgs, Precinct } from '../../../models';

const SET_STATE = 'SET_STATE';
const SET_PRECINCTS = 'SET_PRECINCTS';
const SET_PRECINCT_MAP = 'SET_PRECINCT_MAP';
const SET_MAP_FILTER = 'SET_MAP_FILTER';
const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';
const SET_PZERO_ARGS = 'SET_PZERO_ARGS';

export const setSelectedState = (state: string) => {
    return (dispatch: any) => {
        const statePopulator = new StateBordersApi();
        dispatch(selectState(state));
        statePopulator.fetchPrecincts(state).then(precincts => {
            const shapeData: any[] = precincts.data.geometry.features;
            const map = new Map<string, Precinct>();
            (async() => {
                for (const shape of shapeData) {
                    const key = shape.properties.precinct_name;
                    map.set(key, shape);
                }
            });
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

export const setPrecinctMap = (precinctMap: Map<string, Precinct>) => {
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

export const setPZeroArgs = (pZeroArgs: PhaseZeroArgs) => {
    return {
        type: SET_PZERO_ARGS,
        pZeroArgs
    }
}

interface State {
    selectedState: string;
    precincts: any;
    precinctMap: Map<string, Precinct>;
    filter: string;
    level: string;
    pZeroArgs: PhaseZeroArgs
};

const initialState: State = {
    selectedState: 'N/A',
    precincts: null,
    precinctMap: new Map<string, Precinct>(),
    filter: Constants.MAP_FILTER_DEFAULT,
    level: Constants.VIEW_LEVEL_PRECINCTS,
    pZeroArgs: {
        demographicThreshold: 0.5,
        selectedElection: Constants.ELECTION_PRES_16,
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
        case SET_PZERO_ARGS:
            return {
                ...state,
                pZeroArgs: action.pZeroArgs
            }
        default:
            return state;
    }
}