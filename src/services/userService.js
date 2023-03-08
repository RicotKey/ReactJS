import axios from "../axios";

const handleLoginApi = (email, password) =>{
    return axios.post('/api/v1/login', {email, password});
}

const getAllUser = (id) =>{
    return axios.get(`/api/v1/get-all-user?id=${id}`);
}

const createNewUserSV = (data) =>{
    return axios.post('/api/v1/create-new-user', data);
}

export {handleLoginApi, getAllUser, createNewUserSV}