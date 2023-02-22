import axios from "axios";

const baseURL =
    process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PREFIX;

const apiInstance = axios.create({
    baseURL,
});

apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export { apiInstance };
