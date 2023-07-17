import {
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  SEARCH_BOOK,
  BOOKSHELF_SUCCESS,
  BOOKSHELF_FAILURE,
  UPDATE_PROGRESS,
  UPDATE_PROGRESS_RESET,
  CLEAR_SEARCH,
} from "../constants/BookConstants";

const initialstate = {
  isLoading: false,
  error: "",
  books: [],
  searchResults: [],
  searchText: "",
  bookshelfBooks: [],
  selectedBookId: "",
};
const bookReducer = (state = initialstate, action) => {
  console.log("state", state);
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
        //searchResults: action.payload,
        error: "",
        searchText: "",
      };

    case FETCH_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SEARCH_BOOK:
      // const { query } = action.payload;
      // console.log("query", action.payload);
      // const results = state.books.filter((book) =>
      //   book?.volumeInfo?.title?.toLowerCase().includes(query?.toLowerCase())
      // );
      //console.log("searchResults", results);
      return {
        ...state,
        isLoading: false,
        searchText: action.payload,
        //books: [],
        //searchResults: results,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        isLoading: false,
        searchText: "",
        //books: [],
        //searchResults: state.books, // Reset the books array to clear the search results
      };
    case BOOKSHELF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookshelfBooks: action.payload,
        error: "",
      };

    case BOOKSHELF_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        bookshelfBooks: [],
      };
    case UPDATE_PROGRESS:
      return {
        ...state,
        selectedBookId: action.payload,
      };
    case UPDATE_PROGRESS_RESET:
      return {
        ...state,
        selectedBookId: "",
      };
    default:
      return state;
  }
};

export default bookReducer;
