import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:4005/api"
})

export default api