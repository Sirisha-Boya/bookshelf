import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import logger from "redux-logger";
import { persistReducer } from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
};
const persistreducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistreducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
