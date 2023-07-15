import {
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  SEARCH_BOOK,
  BOOKSHELF_SUCCESS,
  BOOKSHELF_FAILURE,
  UPDATE_PROGRESS,
  UPDATE_PROGRESS_RESET,
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
export const fetchBookshelfSuccess = (data) => {
  return {
    type: BOOKSHELF_SUCCESS,
    payload: data,
  };
};
export const fetchBookshelfFailure = (error) => {
  return {
    type: BOOKSHELF_FAILURE,
    payload: error,
  };
};

export const updateBookProgress = (id) => {
  return {
    type: UPDATE_PROGRESS,
    payload: id,
  };
};

export const updateBookReset = () => {
  return {
    type: UPDATE_PROGRESS_RESET,
  };
};
