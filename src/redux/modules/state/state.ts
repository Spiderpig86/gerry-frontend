import * as Constants from '../../../config/constants';
import { StateBordersApi } from '../../../libs/state-borders';

const SET_STATE = 'SET_STATE';
const SET_PRECINCTS = 'SET_PRECINCTS';
const SET_MAP_FILTER = 'SET_MAP_FILTER';

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

const initialState = {
    selectedState: 'N/A',
    precincts: null,
    filter: Constants.MAP_FILTER_PRES_2016
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
        default:
            return state;
    }
}