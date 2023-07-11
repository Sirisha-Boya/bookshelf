import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import RootReducer from "./reducers/RootReducer";

const persisterConfig = {
  key: "root",
  storage,
};
const persistreducer = persistReducer(persisterConfig, RootReducer);

const store = configureStore({
  reducer: persistreducer,
   devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
