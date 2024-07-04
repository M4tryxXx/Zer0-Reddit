import React from "react";
import "./post.css";
import { Outlet } from "react-router";
import { postForPost } from "../Card/Card";
import { handleFullScreen } from "../Card/Card";
import { handleCloseFullScreen } from "../Popular/Popular";

export default function Post() {
  if (postForPost) {
    let mediaUrl;
    console.log(postForPost);
    if (postForPost.data.is_video) {
      mediaUrl = (
        <video controls className="video">
          {" "}
          <source
            src={postForPost.data.media.reddit_video.fallback_url}
            type="video/webm"
          />{" "}
        </video>
      );
    } else if (postForPost.data.thumbnail !== "self") {
      mediaUrl = (
        <img
          className="post-image"
          src={postForPost.data.url}
          onClick={handleFullScreen}
          id={postForPost.data.url}
        />
      );
    }

    console.log(mediaUrl);
    return (
      <>
        <div id="full-screen-image">
          <button className="close-full-screen" onClick={handleCloseFullScreen}>
            X
          </button>
          <img id="full-screen" src="" alt="" />
        </div>
        <div className="main-post">
          <h5>{postForPost.data.author}</h5>
          <h5>{postForPost.data.subreddit_name_prefixed}</h5>

          <div className="title">
            <h4>{postForPost.data.title}</h4>
          </div>
          <div className="media">{mediaUrl}</div>
          <div className="text">
            <p>{postForPost.data.selftext}</p>
          </div>
        </div>
      </>
    );
  }
}
