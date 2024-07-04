import React from "react";
import "./logIn.css";
import { handleLoginWithRedditClick } from "../Auth/Auth";

const handleLogin = async () => {
  await handleLoginWithRedditClick();
};

function LogIn() {
  return (
    <>
      <div id="login">
        <h1>Welcome to Zer0</h1>
        <br />
        <br />
        <h3>Please log in with Reddit to continue </h3>
        <button id="login-button" onClick={handleLogin}>
          {" "}
          Log in{" "}
        </button>
      </div>
    </>
  );
}

export default LogIn;
