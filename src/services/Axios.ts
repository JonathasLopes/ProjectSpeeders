import axios, { AxiosError } from "axios";

export const api = Axios();

function Axios() {
    const token = sessionStorage.getItem("token");

    const api = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.request.use(request => {
        if(token) {
            request.headers.Authorization = `Bearer ${token}`
        }

        return request;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    });

    return api;
}

export default Axios;