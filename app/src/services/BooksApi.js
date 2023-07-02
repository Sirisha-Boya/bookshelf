import axios from "axios";

export const Register = async (obj) => {
  var res = await axios
    .post(`http://www.localhost:3000/users`, obj)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err;
    });
  return res;
};

export const UserLogin = async () => {
    var res = await axios
      .get(`http://localhost:3000/users`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  
    return res;
  };
  