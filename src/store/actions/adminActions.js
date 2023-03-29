import {
    getAllCodeService, createNewUserSV, getAllUser,
    deleteUser, edtiUserSv, getTopDoctor, getAllDoctor,
    saveInforDoctor, getDetailInforDoctor
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from "react-toastify"
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
                toast.success("CREATE USER SUCCESSED!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("CREATE USER FAILED!")
                dispatch(saveUserFailed())
            }
        } catch (e) {
            toast.error("CREATE USER FAILED!")
            dispatch(saveUserFailed());
            console.log("createNewUser error", e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED

})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUser('ALL');


            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error("GET ALL USERS FAILED!")
                dispatch(fetchAllUserFailed)
            }
        } catch (e) {
            toast.error("CREATE ALL USERS FAILED!")
            dispatch(fetchAllUserFailed());
            console.log("fetcAllUserStart error", e)
        }
    }
}

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: users
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED

})

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUser(id);
            if (res && res.errCode === 0) {
                toast.success("DELETE USER SUCCESS!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("DELETE USER FAILED!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error("DELETE USER FAILED!")
            dispatch(deleteUserFailed());
            console.log("deleteUserStart error", e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED

})

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await edtiUserSv(data);
            if (res && res.errCode === 0) {
                toast.success("UPDATE USER SUCCESS!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("UPDATE USER FAILED!")
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("UPDATE USER FAILED!")
            dispatch(editUserFailed());
            console.log("editUserStart error", e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})



export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctor(6);
            if (res && res.errCode === 0) {
                dispatch(
                    {
                        type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                        doctors: res.data
                    }
                )
            } else {

                dispatch(
                    {
                        type: actionTypes.FETCH_TOP_DOCTORS_FAILED

                    }
                )
            }
        } catch (e) {

            dispatch(
                {
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED

                }
            )
            console.log("FETCH_TOP_DOCTORS_FAILED: ", e)
        }
    }
}

export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch(
                    {
                        type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                        alldoctors: res.data
                    }
                )
            } else {

                dispatch(
                    {
                        type: actionTypes.FETCH_ALL_DOCTORS_FAILED

                    }
                )
            }
        } catch (e) {

            dispatch(
                {
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED

                }
            )
            console.log("FETCH_ALL_DOCTORS_FAILED: ", e)
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await saveInforDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("SAVE INFOR DOCTOR SUCCESSED!")
                dispatch(
                    {
                        type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,

                    }
                )
            } else {
                toast.error("SAVE INFOR DOCTOR FAILED!")
                dispatch(
                    {
                        type: actionTypes.SAVE_INFOR_DOCTOR_FAILED

                    }
                )
            }
        } catch (e) {
            toast.error("SAVE INFOR DOCTOR FAILED!")
            dispatch(
                {
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED

                }
            )
            console.log("SAVE_INFOR_DOCTOR_FAILED: ", e)
        }
    }
}


export const fetchInforDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                dispatch(
                    {
                        type: actionTypes.FETCH_INFOR_DOCTOR_SUCCESS,
                        detaildoctor: res.data
                    }
                )
            } else {

                dispatch(
                    {
                        type: actionTypes.FETCH_INFOR_DOCTOR_FAILED
                    }
                )
            }
        } catch (e) {

            dispatch(
                {
                    type: actionTypes.FETCH_INFOR_DOCTOR_FAILED

                }
            )
            console.log("FETCH_INFOR_DOCTOR_FAILED: ", e)
        }
    }
}