import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/v1/login', { email, password });
}

const getAllUser = (id) => {
    return axios.get(`/api/v1/get-all-user?id=${id}`);
}

const createNewUserSV = (data) => {
    return axios.post('/api/v1/create-new-user', data);
}

const deleteUser = (id) => {
    return axios.delete('/api/v1/delete-user', { data: { id: id } });
}

const edtiUserSv = (data) => {
    return axios.put('/api/v1/edit-user', data)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/v1/allcodes?type=${inputType}`);
}


const getTopDoctor = (limit) => {
    return axios.get(`/api/v1/top-doctor-home?limit=${limit}`);
}

const getAllDoctor = (limit) => {
    return axios.get('/api/v1/get-all-doctor');
}

const saveInforDoctor = (data) => {
    return axios.post('/api/v1/post-infor-doctor', data);
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/v1/getdetailDoctor?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/v1/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorid, date) => {
    return axios.get(`/api/v1/get-schedule-doctor-by-date?doctorid=${doctorid}&date=${date}`)
}

const getExtraInforDoctorById = (doctorid) => {
    return axios.get(`/api/v1/get-extra-infor-doctor-by-id?doctorid=${doctorid}`)
}

const getProfileDoctorById = (doctorid) => {
    return axios.get(`/api/v1/get-profile-doctor-by-id?doctorid=${doctorid}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/v1/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/v1/verify-book-appointment', data)
}

export {
    handleLoginApi, getAllUser,
    createNewUserSV, deleteUser,
    edtiUserSv, getAllCodeService, getTopDoctor,
    getAllDoctor, saveInforDoctor,
    getDetailInforDoctor, saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment
}