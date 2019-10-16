import * as Constants from '../../../config/constants';
import { StateBordersApi } from '../../../libs/state-borders';

const SET_STATE = 'SET_STATE';
const SET_PRECINCTS = 'SET_PRECINCTS';
const SET_MAP_FILTER = 'SET_MAP_FILTER';
const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';

export const setSelectedState = (state: string) => {
    return (dispatch: any) => {
        const statePopulator = new StateBordersApi();
        dispatch(selectState(state));
        statePopulator.fetchPrecincts(state).then(precincts => {
            dispatch(setPrecincts(null));
            dispatch(setPrecincts(precincts.data.geometry|| null));
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

const initialState = {
    selectedState: 'N/A',
    precincts: null,
    filter: Constants.MAP_FILTER_DEFAULT,
    level: Constants.VIEW_LEVEL_PRECINCTS
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
        default:
            return state;
    }
}