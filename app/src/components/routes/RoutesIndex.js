import React from "react";
import {
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

const RoutesIndex = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home/preview/:id" element={<PreviewBook />} />
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}

        <Route path="/mybookshelf" element={<BookShelf />} />
      </Route>
      <Route path="/login" element={<LandingScreen />}>
        <Route index element={<LoginScreen />} />
      </Route>
    </>
  )
);

export default RoutesIndex;
