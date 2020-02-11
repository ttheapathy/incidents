import axios from 'axios';

import authStore from './stores/authStore';

const http = axios.create({});

http.interceptors.request.use(
    config => {
        const tokens = authStore.getTokens();
        if (tokens) {
            config.headers['Authorization'] = 'JWT ' + tokens.access;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) =>  {
        return Promise.reject(error);
    }
);

export default http;