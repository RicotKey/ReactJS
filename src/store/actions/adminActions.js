import { getAllCodeService } from '../../services/userService';
import actionTypes from './actionTypes';

// export const fetchStart = () => ({
//     type: actionTypes.FETCH_START
// })

export const fetchStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchSuccess(res.data))
            } else {
                dispatch(fetchFailed)
            }
        } catch (e) {
            dispatch(fetchFailed());
            console.log("fetchStart error", e)
        }
    }
}


export const fetchSuccess = (data) => ({
    type: actionTypes.FETCH_SUCCESS,
    data: data
})

export const fetchFailed = () => ({
    type: actionTypes.FETCH_FAILED
})


