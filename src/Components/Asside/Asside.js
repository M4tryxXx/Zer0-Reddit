import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPopular } from "../Popular/popularSlice";
import { loadNew } from "../New/newSlice";
import "./asside.css";
import { Link } from "react-router-dom";

export default function Asside() {
  const dispatch = useDispatch();
  return (
    <div className="asside">
      <Link to="/popular">
        <button
          className="button"
          onClick={() => {
            dispatch(loadPopular());
          }}
        >
          Popular
        </button>
      </Link>
      <Link to="/new">
        <button
          className="button"
          onClick={() => {
            dispatch(loadNew());
          }}
        >
          New
        </button>
      </Link>
    </div>
  );
}
