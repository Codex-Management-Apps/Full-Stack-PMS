import axios, { AxiosRequestConfig } from 'axios';


export interface ApiResponse<T> {
    data: T;
}

export const getAuthToken = (): string | null => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null): void => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = async <T>(method: AxiosRequestConfig["method"], url: string, data?: any): Promise<T> => {
    let headers: Record<string, string> = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });

};
