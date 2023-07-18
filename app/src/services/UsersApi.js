import axios from "axios";
import URL from "../Config.json";

export const Register = async (obj) => {
  var res = await axios
    .post(`${URL.API_BASE_URL}/register`, obj)
    .then((response) => {
      //console.log("stark",response)
      return response.data;
    })
    .catch((error) => {
      //console.log("hulk",error)
      return error.response.data;
    });
  return res;
};

export const Login = async (obj) => {
  var res = await axios
    .post(`${URL.API_BASE_URL}/login`, obj)
    .then((response) => {
      //console.log("stark",response)
  
      return response.data;
    })
    .catch((error) => {
      //console.log("hulk",error)
      return error.response.data;
    });
  return res;
};

export const Users = async () => {
  var res = await axios
    .get(`${URL.API_BASE_URL}/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};
