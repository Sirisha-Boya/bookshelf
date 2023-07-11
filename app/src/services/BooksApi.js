import axios from "axios";
import store from "../redux/store";
import {
  fetchBookFailure,
  fetchBookRequest,
  fetchBookSuccess,
} from "../redux/actions/BookActions";

const baseUrl = "http://localhost:3002/api";
export const GetBooks = async () => {
  store.dispatch(fetchBookRequest());
  var res = await axios
    .get(`${baseUrl}/books`)
    .then((response) => {
      store.dispatch(fetchBookSuccess(response.data));
      console.log("response", response.data);
      return response.data;
    })
    .catch((error) => {
      store.dispatch(fetchBookFailure(error.message));
      return error.message;
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
