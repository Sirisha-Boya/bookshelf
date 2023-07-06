import { FETCH_LOGIN_FAILURE, FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/UserConstants";

  
  export const fetchLoginRequest = () => {
    return {
      type: FETCH_LOGIN_REQUEST,
    };
  };
  export const fetchLoginSuccess = (user) => {
    return {
      type: FETCH_LOGIN_SUCCESS,
      payload: user,
    };
  };
  export const fetchLoginFailure = (error) => {
    return {
      type: FETCH_LOGIN_FAILURE,
      payload: error,
    };
  };
  
  export const logoutUser = ( ) => {
    return {
      type: USER_LOGOUT,
    };
  };
  