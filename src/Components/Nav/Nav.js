import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPopular } from "../Popular/popularSlice";
import { loadNew } from "../New/newSlice";
import { NavLink } from "react-router-dom";
import "./nav.css";
import { loadTop } from "../Top/topSlice";

export default function Nav() {
  const dispatch = useDispatch();
  return (
    <div id="nav-div">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink
              to="/popular"
              onClick={() => {
                dispatch(loadPopular());
              }}
            >
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              onClick={() => {
                dispatch(loadNew());
              }}
            >
              New
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/top"
              onClick={() => {
                dispatch(loadTop());
              }}
            >
              Top
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
