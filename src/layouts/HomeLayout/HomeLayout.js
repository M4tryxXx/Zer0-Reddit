import React from "react";
import { Outlet } from "react-router";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import "../../styles.css";
import Asside from "../../Components/Asside/Asside";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Nav />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
