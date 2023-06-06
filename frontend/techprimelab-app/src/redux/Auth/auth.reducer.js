import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";

let token = localStorage.getItem("user");
const intialState = {
    isAuth: false,
    token: token,
    data: [],
    loading: false,
    error: false,
    message: "",
};

export const authReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                token: payload.token,
                loading: false,
                error: false,
                message: "Login Successfull"
            }
        }
        case LOGIN_ERROR: {

            return {
                ...state,
                isAuth: false,
                loading: false,
                error: true,
                message: payload
            }
        }

        case LOGOUT: {
            return {
                ...state,
                isAuth: false,
                token: "",
                message: "",
            }
        }
        default: {
            return state;
        }
    }
}