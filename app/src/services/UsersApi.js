import axios from "axios";

const BaseUrl = "http://16.171.34.31:80/api"
export const Register = async (obj) => {
  var res = await axios
    .post(`${BaseUrl}/register`, obj)
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
    .post(`${BaseUrl}/login`, obj)
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
    .get(`${BaseUrl}/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};
