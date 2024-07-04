import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";
import "./card.css";

export const handleFullScreen = (e) => {
  document.getElementById("full-screen").src = e.target.id;
  document.getElementById("full-screen-image").style.display = "flex";
  console.log(e.target.src);
};
export let postForPost;

export default function Card({
  keyNumber,
  title,
  description,
  videoUrl,
  imageUrl,
  author,
  ups,
  comms,
  id,
  obj,
}) {
  const [vote, setVote] = useState(0);
  const navigate = useNavigate();
  let upArrow;
  let downArrow;

  switch (vote) {
    case 0:
      upArrow = <TiArrowUpOutline />;
      downArrow = <TiArrowDownOutline />;
      break;
    case 1:
      upArrow = <TiArrowUpThick />;
      downArrow = <TiArrowDownOutline />;
      break;
    case -1:
      upArrow = <TiArrowUpOutline />;
      downArrow = <TiArrowDownThick />;
      break;
    default:
      upArrow = <TiArrowUpOutline />;
      downArrow = <TiArrowDownOutline />;
      break;
  }

  const handleUp = () => {
    if (vote === 0 || vote === -1) {
      setVote(1);
    } else {
      setVote(0);
    }
  };
  const handleDown = () => {
    if (vote === 0 || vote === 1) {
      setVote(-1);
    } else {
      setVote(0);
    }
  };
  const handleClick = (e) => {
    navigate(e.target.id);
    postForPost = obj;
  };

  return (
    <div className="main-card" key={keyNumber}>
      <div className="top-card">
        <div className="author">
          <img src="" alt="" />
          <p>By: {author}</p>
        </div>
        <h3 className="text h2 post-link" id={id} onClick={handleClick}>
          {title}
        </h3>
      </div>
      {imageUrl ? (
        <div
          className="img"
          style={{
            backgroundImage: `url("${imageUrl}")`,
            width: "100%",
            height: "350px",
            backgroundSize: "cover",
          }}
          id={imageUrl}
          onClick={handleFullScreen}
        ></div>
      ) : (
        ""
      )}

      {videoUrl ? (
        <video controls className="video">
          {" "}
          <source src={videoUrl} type="video/webm" />{" "}
        </video>
      ) : (
        ""
      )}
      <div className="card-text">
        <p className="text para">{description}</p>
      </div>
      <div className="vote-comments">
        <div className="votes">
          <div className="up-container">
            <div className="up" onClick={handleUp}>
              {upArrow}
            </div>
            <p>{ups}</p>
          </div>
          <div className="down-container" onClick={handleDown}>
            {downArrow}
          </div>
        </div>
        <div className="comments">
          <div className="commLink">
            <TiMessage />
          </div>
          <p>{comms}</p>
        </div>
      </div>
    </div>
  );
}
