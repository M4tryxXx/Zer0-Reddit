import React, { useEffect } from "react";
import Card from "../Card/Card";
import Skeleton from "react-loading-skeleton";
import "./top.css";
import NextPrev from "../NextPrevButtons/NextPrevButtons";
import { useSelector } from "react-redux";
import { currentTime, expireTime } from "../Auth/Auth";
import { handleCloseFullScreen } from "../Popular/Popular";
// import { loadPopular } from "./popularSlice";

let cards = [];
let author = "";

export default function Top({ next, prev }) {
  const posts = useSelector((state) => state.top);
  console.log(posts);
  useEffect(() => {}, [posts.topPosts]);

  if (expireTime > currentTime && posts.topPosts) {
    cards = [];
    for (let i = 0; i < posts.topPosts.data.children.length; i++) {
      if (posts.topPosts.data.children[i].data.author !== "[deleted]") {
        author = posts.topPosts.data.children[i].data.author;
      }
      if (posts.topPosts.data.children[i].data.is_video) {
        cards.push(
          <Card
            keyNumber={posts.topPosts.data.children[i].data.id}
            title={posts.topPosts.data.children[i].data.title}
            description={posts.topPosts.data.children[i].data.selftext}
            videoUrl={
              posts.topPosts.data.children[i].data.media.reddit_video
                .fallback_url
            }
            author={author}
            ups={posts.topPosts.data.children[i].data.ups}
            comms={posts.topPosts.data.children[i].data.num_comments}
            id={posts.topPosts.data.children[i].data.id}
            obj={posts.topPosts.data.children[i]}
          />
        );
      } else if (posts.topPosts.data.children[i].data.thumbnail !== "self") {
        cards.push(
          <Card
            keyNumber={posts.topPosts.data.children[i].data.id}
            title={posts.topPosts.data.children[i].data.title}
            description={posts.topPosts.data.children[i].data.selftext}
            imageUrl={posts.topPosts.data.children[i].data.url}
            author={author}
            ups={posts.topPosts.data.children[i].data.ups}
            comms={posts.topPosts.data.children[i].data.num_comments}
            id={posts.topPosts.data.children[i].data.id}
            obj={posts.topPosts.data.children[i]}
          />
        );
      } else {
        cards.push(
          <Card
            keyNumber={posts.topPosts.data.children[i].data.id}
            title={posts.topPosts.data.children[i].data.title}
            description={posts.topPosts.data.children[i].data.selftext}
            author={author}
            ups={posts.topPosts.data.children[i].data.ups}
            comms={posts.topPosts.data.children[i].data.num_comments}
            id={posts.topPosts.data.children[i].data.id}
            obj={posts.topPosts.data.children[i]}
          />
        );
      }
    }
  }

  return (
    <>
      <div id="full-screen-image">
        <button className="close-full-screen" onClick={handleCloseFullScreen}>
          X
        </button>
        <img id="full-screen" src="" alt="" />
      </div>
      <div className="cards-container">
        {posts.isLoading ? <h3>Loading Top Posts...</h3> : cards}
        <NextPrev
          requestFrom="top"
          next={posts.topPosts.data ? posts.topPosts.data.after : ""}
          prev={posts.topPosts.data ? posts.topPosts.data.before : ""}
        />
      </div>
    </>
  );
}
