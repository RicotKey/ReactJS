import axios from "../axios";

let handleLoginApi = (email, password) =>{
    return axios.post('/api/v1/login', {email, password});
}

export {handleLoginApi}