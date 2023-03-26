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

const deleteUser = (id) => {
    return axios.delete('/api/v1/delete-user', {data:{id: id}});
}

const edtiUserSv = (data) =>{
    return axios.put('/api/v1/edit-user', data)
}

const getAllCodeService = (inputType)=>{
    return axios.get(`/api/v1//allcodes?type=${inputType}`);
}

export {handleLoginApi, getAllUser, createNewUserSV, deleteUser, edtiUserSv, getAllCodeService}