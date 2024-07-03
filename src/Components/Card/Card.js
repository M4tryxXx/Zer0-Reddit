import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";
import "./card.css";

export default function Card({
  keyNumber,
  title,
  description,
  videoUrl,
  imageUrl,
  author,
  ups,
  comms,
}) {
  const [vote, setVote] = useState(0);
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

  return (
    <div className="main-card" key={keyNumber}>
      <div className="top-card">
        <div className="author">
          <img src="" alt="" />
          <p>By: {author}</p>
        </div>

        <h3 className="text h2">{title}</h3>
      </div>
      <Link to="/cards/card">
        {imageUrl ? <img src={imageUrl} alt={`Post Thumbnail`} /> : ""}

        {videoUrl ? (
          <video controls className="video">
            {" "}
            <source src={videoUrl} type="video/webm" />{" "}
          </video>
        ) : (
          ""
        )}
      </Link>
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
          <TiMessage />
          <p>{comms}</p>
        </div>
      </div>
    </div>
  );
}
