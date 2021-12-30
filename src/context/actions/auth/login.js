import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_START } from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default ({ password, userName: username }) => (dispatch) =>{

    dispatch({
        type: LOGIN_LOADING
    });

    axiosInstance.post("auth/login", {
        password,
        username,
    })
    .then((res) => {
        console.log(`res.data ==>`, res.data);
        
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    })
    .catch((err) => {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response ? err.response.data : { error: "Something went wrong, Try Again !!!" } 
        });
    });
};


// 1st => axios action
// 2nd => global state dispatch
// 3rd => listen reducer