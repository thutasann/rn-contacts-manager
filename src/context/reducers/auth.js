import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_AUTH_STATE, LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER } from "../../constants/actionTypes";

const auth = (state, {type, payload}) => {

    switch (type) {
        
        case REGISTER_LOADING:
            case LOGIN_LOADING:
            return{
                ...state, // from authInitialState.js
                loading: true,
            };
        
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading: false,
                data: payload,
            };

        case LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                data: payload,
                isLoggedIn: true,
            };
        
        case LOGOUT_USER:
            return{
                ...state,
                loading: false,
                data: null,
                isLoggedIn: false,
            };
        
        case REGISTER_FAIL:
            case LOGIN_FAIL:
            return{
                ...state,
                loading: false,
                error: payload,
            };

        case CLEAR_AUTH_STATE:
            return{
                ...state,
                loading: false,
                data: null,
                error: null,
            };

        default:
            return state;
    }

};

export default auth;






// function to determine what previous state we had and
// what it should change after something happens