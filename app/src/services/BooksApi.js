import axios from "axios";
import store from "../redux/store";
import {
  fetchBookFailure,
  fetchBookRequest,
  fetchBookSuccess,
  fetchBookshelfFailure,
  fetchBookshelfSuccess,
} from "../redux/actions/BookActions";


export const GetBooks = async () => {
  store.dispatch(fetchBookRequest());
  var res = await axios
    .get(`https://bookshelf-xx4y.onrender.com/api/books`)
    .then((response) => {
      store.dispatch(fetchBookSuccess(response.data));
      console.log("response", response.data);
      return response.data;
    })
    .catch((error) => {
      store.dispatch(fetchBookFailure(error.response.data));
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
    .post(`https://bookshelf-xx4y.onrender.com/api/addbook/${userId}/${bookId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};

export const BookshelfBooksStatusCheck = async (userId, status) => {
  store.dispatch(fetchBookRequest());
  var res = await axios
    .get(`https://bookshelf-xx4y.onrender.com/api/bookshelfbooksstatus/${userId}/${status}`)
    .then((response) => {
      console.log("starkAxios", response.data);
      store.dispatch(fetchBookshelfSuccess(response.data));
      return response.data;
    })
    .catch((error) => {
      store.dispatch(fetchBookshelfFailure(error.response.data));
      return error.response.data;
    });

  return res;
};

export const UpdateBook = async (userId, bookId, obj) => {
  var res = await axios
    .put(`https://bookshelf-xx4y.onrender.com/api/updateBookProgress/${userId}/${bookId}`, obj)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};
