import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    authErrors: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            // console.log(action.payload)
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('nuserkey', action.payload.user.nuserkey);
            localStorage.setItem('nusertypekey', action.payload.user.nusertypekey);
            localStorage.setItem('full_name', action.payload.user.full_name);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                authErrors: {}
            };
        case LOGOUT_SUCCESS:
            localStorage.clear()
            return {
                ...state,
                state: null,
                token: null,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                authErrors: action.payload
            }
        default:
            return state;
    }
}
