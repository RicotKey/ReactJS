import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START:
            return {
                ...state,
            }

        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
            }

        case actionTypes.FETCH_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;