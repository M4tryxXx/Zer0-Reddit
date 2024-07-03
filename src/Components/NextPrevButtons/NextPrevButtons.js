import React, { useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { loadNew } from "../New/newSlice";

import "./nextPrev.css";
import { loadPopular } from "../Popular/popularSlice";
import { loadTop } from "../Top/topSlice";

export default function NextPrev({ requestFrom, next, prev }) {
  useEffect(() => {}, [next]);
  const dispatch = useDispatch();
  console.log(next);
  if (next) {
    if (requestFrom === "popular") {
      return (
        <div className="prev-next">
          {prev ? (
            <button className="prev">
              <SlArrowLeft />
            </button>
          ) : (
            <button className="prev" disabled>
              <SlArrowLeft />
            </button>
          )}
          {next ? (
            <button
              className="next"
              onClick={() => {
                dispatch(loadPopular(next));
              }}
            >
              <SlArrowRight />
            </button>
          ) : (
            <button className="next" disabled>
              <SlArrowRight />
            </button>
          )}
        </div>
      );
    } else if (requestFrom === "new") {
      return (
        <div className="prev-next">
          {prev ? (
            <button className="prev">
              <SlArrowLeft />
            </button>
          ) : (
            <button className="prev" disabled>
              <SlArrowLeft />
            </button>
          )}
          {next ? (
            <button
              className="next"
              onClick={() => {
                dispatch(loadNew(next));
              }}
            >
              <SlArrowRight />
            </button>
          ) : (
            <button className="next" disabled>
              <SlArrowRight />
            </button>
          )}
        </div>
      );
    } else if (requestFrom === "top") {
      return (
        <div className="prev-next">
          {prev ? (
            <button className="prev">
              <SlArrowLeft />
            </button>
          ) : (
            <button className="prev" disabled>
              <SlArrowLeft />
            </button>
          )}
          {next ? (
            <button
              className="next"
              onClick={() => {
                dispatch(loadTop(next));
              }}
            >
              <SlArrowRight />
            </button>
          ) : (
            <button className="next" disabled>
              <SlArrowRight />
            </button>
          )}
        </div>
      );
    }
  }
}
