const SET_TOOLTIP_DATA = 'SET_TOOLTIP_DATA';

export const setTooltipData = (data: any) => {
    return (dispatch: any) => {
        dispatch(setTooltip(data));
    }
}

export const setTooltip = (tooltipData: any) => {
    return {
        type: SET_TOOLTIP_DATA,
        tooltipData
    }
}

const initialState = {
    tooltipData: {
        title: null,
        subtitle: null,
        statistics: null
    },
}

export const mapTooltipReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TOOLTIP_DATA:
            return {
                ...state,
                tooltipData: action.tooltipData
            }
        default:
            return state;
    }
}