import axios from 'axios';
import toast from 'react-hot-toast';

const AxiosInterceptors = axios.create();

const takeAction = () => {
    toast.error("Unauthorized")
    sessionStorage.clear()
    window.location.href = '/'
}

// OPTIONAL, To add Param in url
AxiosInterceptors.interceptors.request.use(function (config) {
    if (config.url) {
        const sessionId = window.sessionStorage.getItem('sessionId');
        const url = new URL(config.url, AxiosInterceptors.defaults.baseURL);
        url.searchParams.append('session_id', sessionId);
        config.url = url.toString();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Main Function
AxiosInterceptors.interceptors.response.use(
    (response) => {
        if (response?.status === 401) {
            takeAction()
        }
        return response;
    },
    (error) => {
        if (error?.response && error?.response?.status === 401) {
            takeAction()
        }
        return Promise.reject(error);
    }
);

export default AxiosInterceptors