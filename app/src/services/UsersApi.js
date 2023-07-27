import axios from "axios";
import URL from "../Constants.json";

export const Register = async (obj) => {
  var res = await axios
    .post(`/api/register`, obj)
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
    .post(`/api/login`, obj)
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
    .get(`/api/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};
