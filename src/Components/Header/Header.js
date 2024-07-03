import React from "react";
import "../../layouts/HomeLayout/HomeLayout.css";
import { currentToken } from "../Auth/Auth";

import "./header.css";
import Profile from "../Profile/Profile";

export default function Header() {
  return (
    <header>
      {currentToken.access_token ? <Profile /> : ""}
      <h1 className="header">Zer0-CiV</h1>
    </header>
  );
}
