import axios from "axios";

const apiaxios = axios.create({
    baseURL: "http://127.0.0.1:8000" + "/api",
    withCredentials: true,
});

apiaxios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});


export { apiaxios };
