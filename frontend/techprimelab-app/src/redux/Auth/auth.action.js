// import axios from "axios";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "./auth.types";
import { BaseUrl } from "../../utills/helper";

export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await fetch(`${BaseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    if (!data.error) {
      dispatch({ type: LOGIN_SUCCESS, payload: data })
    } else {
      dispatch({ type: LOGIN_ERROR, payload: data.error })
    }
    return data;
  }
  catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message })
    console.log(e)
  }
}


const authlogout = () => async (dispatch) => {
  dispatch({ type: LOGIN_ERROR, payload: "Logout Successfull!" })
}

export default authlogout;
