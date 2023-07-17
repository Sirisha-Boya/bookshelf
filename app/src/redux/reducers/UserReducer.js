import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  REGISTER_USER,
  USER_LOGOUT,
} from "../constants/UserConstants";

const initialstate = {
  isLoading: false,
  user: {},
  error: "",
  userId: null,
  name: null,
  email: null,
  temp: null,
};
const userReducer = (state = initialstate, action) => {
  if (action.type == FETCH_LOGIN_SUCCESS) {
    var { id, email, name } = action.payload;
  }

  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: id,
        name: name,
        email: email,
        //temp: action.payload,
      };

    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoading: false,
        error: "",
        userId: "",
        name: "",
        email: "",
      };
    default:
      return state;
  }
};

export default userReducer;
