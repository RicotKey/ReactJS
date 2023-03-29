import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    alldoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoading = true;
            return {
                ...copyState,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:


            state.genders = action.data;
            state.isLoading = false;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:

            state.isLoading = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:


            state.roles = action.data;
            state.isLoading = false;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:

            state.isLoading = false;
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;
            state.isLoading = false;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:

            state.isLoading = false;
            state.positions = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:


            state.users = action.users;
            state.isLoading = false;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:

            state.isLoading = false;
            state.users = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:


            state.doctors = action.doctors;

            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:


            state.doctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:


            state.alldoctors = action.alldoctors;

            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:


            state.alldoctors = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;