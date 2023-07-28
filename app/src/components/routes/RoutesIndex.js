import React from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingScreen from "../LandingScreen";
import LoginScreen from "../LoginScreen";
import HomePage from "../homePage/HomePage";
import PreviewBook from "../homePage/PreviewBook";
import NotFound from "../../utilities/NotFound";
import BookShelf from "../myBookshelf/BookShelf";
import Layout from "../layout/Layout";
import Library from "../library/Library";

const RoutesIndex = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/" element={<Navigate to="/login" replace/>} /> */}
      <Route path="/" element={<LandingScreen />}>
        <Route index element={<LoginScreen />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index path="/home" element={<HomePage />} />
        <Route path="/preview/:id" element={<PreviewBook />} />
        <Route path="/library" element={<Library />} />
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}

        <Route path="/mybookshelf" element={<BookShelf />} />
      </Route>
    </>
  )
);

export default RoutesIndex;
