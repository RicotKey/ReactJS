import { getAllCodeService, createNewUserSV } from '../../services/userService';
import actionTypes from './actionTypes';

// export const fetchStart = () => ({
//     type: actionTypes.FETCH_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed)
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error", e)
        }
    }
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed)
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositonStart error", e)
        }
    }
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//Role

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed)
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetcRoleStart error", e)
        }
    }
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED

})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserSV(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("createNewUser error", e)
        }
    }
}

export const saveUserSuccess = (data) => ({
    type: actionTypes.SAVE_USER_SUCCESS,
    data: data
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED

})
