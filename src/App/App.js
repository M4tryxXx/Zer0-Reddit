import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import ErrorHandling from "../layouts/ErrorHandling";
import Popular from "../Components/Popular/Popular";
import LogIn from "../Components/LogIn/LogIn";
import { currentTime, expireTime } from "../Components/Auth/Auth";
import { currentToken } from "../Components/Auth/Auth";
import New from "../Components/New/New";
import Top from "../Components/Top/Top";
import Home from "../Components/Home/Home";
import Post from "../Components/Post/Post";

export default function App() {
  console.log(expireTime > currentTime);
  if (expireTime < currentTime) {
    return <LogIn />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="popular" element={<Popular />} />
          <Route path="new" element={<New />} />
          <Route path="top" element={<Top />} />
          <Route path="popular/:id" element={<Post />} />
          <Route path="new/:id" element={<Post />} />
          <Route path="top/:id" element={<Post />} />
          <Route path="*" element={<ErrorHandling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
