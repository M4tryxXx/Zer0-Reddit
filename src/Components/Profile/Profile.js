import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentTime, expireTime } from "../Auth/Auth";
import { currentToken } from "../Auth/Auth";
import { redirectUrl } from "../Auth/Auth";
import { loadProfile } from "./profileSlice";
import { store } from "../../App/store";
import "./profile.css";

async function handleLogoutClick() {
  localStorage.clear();
  window.location.href = redirectUrl;
}
if (currentToken.access_token && expireTime > currentTime) {
  store.dispatch(loadProfile());
}

export default function Profile() {
  const profile = useSelector((state) => state.profile);

  //   useEffect(() => {}, [profile.isLoading]);

//   console.log(profile);
  if (currentToken.access_token && expireTime > currentTime) {
    // console.log(profile);

    if (profile.profile) {
      return (
        <div className="profile">
          {profile.profile ? (
            <img src={profile.profile.icon_img} height="45px" width="45px" />
          ) : (
            <p>no avatar</p>
          )}
          <p className="profile-name">{profile.profile.subreddit.title}</p>
          <button className="button" onClick={handleLogoutClick}>
            Log Out
          </button>
        </div>
      );
    }
  }
}
