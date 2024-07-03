import React, { useEffect } from "react";
import Card from "../Card/Card";
// import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "./popular.css";
// import { currentToken } from "../Auth/Auth";
import NextPrev from "../NextPrevButtons/NextPrevButtons";
import { useSelector } from "react-redux";
import { currentTime, expireTime } from "../Auth/Auth";
// import { loadPopular } from "./popularSlice";

let cards = [];
let author = "";

export default function Popular({ next, prev }) {
  const posts = useSelector((state) => state.popular);
  console.log(posts);
  useEffect(() => {}, [posts.popularPosts]);

  if (expireTime > currentTime && posts.popularPosts) {
    cards = [];
    for (let i = 0; i < posts.popularPosts.data.children.length; i++) {
      if (posts.popularPosts.data.children[i].data.author !== "[deleted]") {
        author = posts.popularPosts.data.children[i].data.author;
      }
      if (posts.popularPosts.data.children[i].data.is_video) {
        cards.push(
          <Card
            keyNumber={i}
            title={posts.popularPosts.data.children[i].data.title}
            description={posts.popularPosts.data.children[i].data.selftext}
            videoUrl={
              posts.popularPosts.data.children[i].data.media.reddit_video
                .fallback_url
            }
            author={author}
            ups={posts.popularPosts.data.children[i].data.ups}
            comms={posts.popularPosts.data.children[i].data.num_comments}
          />
        );
      } else if (
        posts.popularPosts.data.children[i].data.thumbnail !== "self"
      ) {
        cards.push(
          <Card
            keyNumber={i}
            title={posts.popularPosts.data.children[i].data.title}
            description={posts.popularPosts.data.children[i].data.selftext}
            imageUrl={posts.popularPosts.data.children[i].data.url}
            author={author}
            ups={posts.popularPosts.data.children[i].data.ups}
            comms={posts.popularPosts.data.children[i].data.num_comments}
          />
        );
      } else {
        cards.push(
          <Card
            keyNumber={i}
            title={posts.popularPosts.data.children[i].data.title}
            description={posts.popularPosts.data.children[i].data.selftext}
            author={author}
            ups={posts.popularPosts.data.children[i].data.ups}
            comms={posts.popularPosts.data.children[i].data.num_comments}
          />
        );
      }
    }
  }

  return (
    <>
      <div className="cards-container">
        {posts.isLoading ? <h3>Loading Popular Posts...</h3> : cards}
        <NextPrev
          requestFrom="popular"
          next={posts.popularPosts.data ? posts.popularPosts.data.after : ""}
          prev={posts.popularPosts.data ? posts.popularPosts.data.before : ""}
        />
      </div>
    </>
  );
}
