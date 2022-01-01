import axios from 'axios';
import envs from '../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/SideMenu/RootNavigator';
import { LOGOUT } from '../constants/routeNames';

let headers={};

const axiosInstance = axios.create({
    baseURL: envs.BACKEND_URL,
    headers,
});


axiosInstance.interceptors.request.use(
    async (config) => {

        const token = await AsyncStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, 
    (error) =>{
        return Promise.reject(error);
    },
);

// Axios auth interceptor (7:37:40) ==> Error 403 -> Logout
axiosInstance.interceptors.response.use((response) => new Promise((resolve, reject) => {
    resolve(response);
}), (error) => {
    if(!error.response){
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    if(error.response.status === 403){
        navigate(LOGOUT, { tokenExpired: true });
    }
    else{
        return new Promise((resolve, reject) =>{
            reject(error);
        });
    }
});

export default axiosInstance;