import {
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  SEARCH_BOOK,
} from "../constants/BookConstants";

const initialstate = {
  isLoading: false,
  error: "",
  books: [],
  searchText: "",
};
const bookReducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      };

    case FETCH_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SEARCH_BOOK:
      //const { query } = action.payload;
      console.log("query", action.payload);
      // const searchResults = state.books?.filter((book) =>
      //   book?.volumeInfo?.title
      //     ?.toLowerCase()
      //     ?.includes(action.payload?.toLowerCase())
      // );
      return { ...state, isLoading: false, searchText: action.payload };
    default:
      return state;
  }
};

export default bookReducer;
