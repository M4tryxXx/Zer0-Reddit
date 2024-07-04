import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "./new.css";
import { currentToken } from "../Auth/Auth";
import NextPrev from "../NextPrevButtons/NextPrevButtons";
import { useSelector } from "react-redux";
import { loadNew } from "./newSlice";
import { handleCloseFullScreen } from "../Popular/Popular";

const now = new Date();
export const currentTime = now.getTime();
export const expireTime = Number(localStorage.getItem("expireTime"));
console.log(expireTime > currentTime);

let cards = [];
let author = "";

export default function New() {
  const posts = useSelector((state) => state.new);
  console.log(posts);
  useEffect(() => {}, [posts.newPosts]);

  if (expireTime > currentTime && posts.newPosts) {
    cards = [];
    for (let i = 0; i < posts.newPosts.data.children.length; i++) {
      let videoEmbedSrc = "";
      let toCheck = posts.newPosts.data.children[i].data.media;
      if (toCheck) {
        // let src = posts.popularPosts.data.children[i].data.media.embed.html;
        // videoEmbedSrc = src.replace(/&lt;/g, "<");
        // let srcTwo = videoEmbedSrc.replace(/&gt;/g, ">");
        console.log(toCheck);
      }
      if (posts.newPosts.data.children[i].data.author !== "[deleted]") {
        author = posts.newPosts.data.children[i].data.author;
      }
      if (posts.newPosts.data.children[i].data.is_video) {
        cards.push(
          <Card
            keyNumber={posts.newPosts.data.children[i].data.id}
            title={posts.newPosts.data.children[i].data.title}
            description={posts.newPosts.data.children[i].data.selftext}
            videoUrl={
              posts.newPosts.data.children[i].data.media.reddit_video
                .fallback_url
            }
            author={author}
            ups={posts.newPosts.data.children[i].data.ups}
            comms={posts.newPosts.data.children[i].data.num_comments}
            id={posts.newPosts.data.children[i].data.id}
            obj={posts.newPosts.data.children[i]}
          />
        );
      } else if (posts.newPosts.data.children[i].data.thumbnail !== "self") {
        cards.push(
          <Card
            keyNumber={posts.newPosts.data.children[i].data.id}
            title={posts.newPosts.data.children[i].data.title}
            description={posts.newPosts.data.children[i].data.selftext}
            imageUrl={posts.newPosts.data.children[i].data.url}
            author={author}
            ups={posts.newPosts.data.children[i].data.ups}
            comms={posts.newPosts.data.children[i].data.num_comments}
            id={posts.newPosts.data.children[i].data.id}
            obj={posts.newPosts.data.children[i]}
          />
        );
      } else {
        cards.push(
          <Card
            keyNumber={posts.newPosts.data.children[i].data.id}
            title={posts.newPosts.data.children[i].data.title}
            description={posts.newPosts.data.children[i].data.selftext}
            author={author}
            ups={posts.newPosts.data.children[i].data.ups}
            comms={posts.newPosts.data.children[i].data.num_comments}
            id={posts.newPosts.data.children[i].data.id}
            obj={posts.newPosts.data.children[i]}
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
        {posts.isLoading ? <h3>Loading New Posts...</h3> : cards}
        <NextPrev
          requestFrom="new"
          next={posts.newPosts.data ? posts.newPosts.data.after : ""}
          prev={posts.newPosts.data ? posts.newPosts.before : ""}
        />
      </div>
    </>
  );
}
