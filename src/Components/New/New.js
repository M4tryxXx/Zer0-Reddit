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

const now = new Date();
export const currentTime = now.getTime();
export const expireTime = Number(localStorage.getItem("expireTime"));
console.log(expireTime > currentTime);

let cards = [];
let author = "";

// const tryNextPage = async (next) => {
//   const data = fetch("https://oauth.reddit.com/new", {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       authorization: "bearer " + currentToken.access_token,
//     },
//     data: {before: next,
//       after: next,
//       limit: 50
//     }
//   }).then((data) => {
//     return data.json();
//   });

//   const response = await data;
//   console.log(response);
// };

// console.log(posts);
// console.log("Lungimea listei children este: ", posts.data.children.length);

export default function New() {
  const posts = useSelector((state) => state.new);
  console.log(posts);
  useEffect(() => {}, [posts.newPosts]);

  if (expireTime > currentTime && posts.newPosts) {
    cards = [];
    for (let i = 0; i < posts.newPosts.data.children.length; i++) {
      if (posts.newPosts.data.children[i].data.author !== "[deleted]") {
        author = posts.newPosts.data.children[i].data.author;
      }
      if (posts.newPosts.data.children[i].data.is_video) {
        cards.push(
          <Card
            keyNumber={i}
            title={posts.newPosts.data.children[i].data.title}
            description={posts.newPosts.data.children[i].data.selftext}
            videoUrl={
              posts.newPosts.data.children[i].data.media.reddit_video
                .fallback_url
            }
            author={author}
            ups={posts.newPosts.data.children[i].data.ups}
            comms={posts.newPosts.data.children[i].data.num_comments}
          />
        );
      } else if (posts.newPosts.data.children[i].data.thumbnail !== "self") {
        cards.push(
          <Card
            keyNumber={i}
            title={posts.newPosts.data.children[i].data.title}
            description={posts.newPosts.data.children[i].data.selftext}
            imageUrl={posts.newPosts.data.children[i].data.url}
            author={author}
            ups={posts.newPosts.data.children[i].data.ups}
            comms={posts.newPosts.data.children[i].data.num_comments}
          />
        );
      } else {
        cards.push(
          <Card
            keyNumber={i}
            title={posts.newPosts.data.children[i].data.title}
            description={posts.newPosts.data.children[i].data.selftext}
            author={author}
            ups={posts.newPosts.data.children[i].data.ups}
            comms={posts.newPosts.data.children[i].data.num_comments}
          />
        );
      }
    }
  }

  return (
    <>
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
