import {
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  SEARCH_BOOK,
} from "../constants/BookConstants";

export const fetchBookRequest = () => {
  return {
    type: FETCH_BOOK_REQUEST,
  };
};
export const fetchBookSuccess = (books) => {
  return {
    type: FETCH_BOOK_SUCCESS,
    payload: books,
  };
};
export const fetchBookFailure = (error) => {
  return {
    type: FETCH_BOOK_FAILURE,
    payload: error,
  };
};
export const searchBook = (query) => {
  return {
    type: SEARCH_BOOK,
    payload: query,
  };
};
