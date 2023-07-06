import axios from "axios";

export const Register = async (obj) => {
  var res = await axios
    .post("http://localhost:3002/api/register", obj)
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
    .post("http://localhost:3002/api/login", obj)
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
    .get("http://localhost:3002/api/users")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
  return res;
};
