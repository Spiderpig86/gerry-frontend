import { StateBordersApi, States } from '../../../api/state-borders';

const SET_STATE = 'SET_STATE';
const SET_PRECINCTS = 'SET_PRECINCTS';

export const setSelectedState = (state: string) => {
    return (dispatch: any) => {
        const statePopulator = new StateBordersApi();
        dispatch(selectState(state));
        statePopulator.fetchPrecincts(state).then(precincts => {
            dispatch(setPrecincts(precincts.data.geometry|| null));
        });
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

const initialState = {
    selectedState: 'N/A',
    precincts: null
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
        default:
            return state;
    }
}