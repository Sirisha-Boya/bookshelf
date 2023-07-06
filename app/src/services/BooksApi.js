import axios from "axios";

// export const Register = async (obj) => {
//   var res = await axios
//     .post(`http://www.localhost:3002/users`, obj)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       throw err;
//     });
//   return res;
// };

// export const UserLogin = async () => {
//   var res = await axios
//     .get(`http://localhost:3002/users`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error;
//     });

//   return res;
// };

export const PreviewBookById = async (bookId) => {
  //var subject = ["technology", "it", "humor", "poetry", "adventure"];
  var res = await axios
    .get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

  return res;
};

// ("http://books.google.co.in/books?id=UOFEAQAAMAAJ&dq=subject:adventure&hl=&cd=1&source=gbs_api");
