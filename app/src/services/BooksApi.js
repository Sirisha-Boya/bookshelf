import axios from "axios";

const baseUrl = "http://localhost:3002/api";
export const GetBooks = async () => {
  var res = await axios
    .get(`${baseUrl}/books`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};

export const PreviewBookById = async (bookId) => {
  //var subject = ["technology", "it", "humor", "poetry", "adventure"];
  var res = await axios
    .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};

export const AddBookToBookshelf = async (userId, bookId) => {
  var res = await axios
    .post(`${baseUrl}/addbook/${userId}/${bookId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};

export const BookshelfBooks = async (userId) => {
  var res = await axios
    .get(`${baseUrl}/bookshelfbooks/${userId}`)
    .then((response) => {
      //console.log("redres", response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};

// ("http://books.google.co.in/books?id=UOFEAQAAMAAJ&dq=subject:adventure&hl=&cd=1&source=gbs_api");
