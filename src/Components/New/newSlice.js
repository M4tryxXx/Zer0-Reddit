import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { currentToken } from "../Auth/Auth";
import { useSelector } from "react-redux";

export const loadNew = createAsyncThunk("new/getPosts", async (next) => {
  const data = fetch("https://oauth.reddit.com/new", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "bearer " + currentToken.access_token,
    },
    limit: 50,
    before: next,
  }).then((data) => {
    return data.json();
  });
  const json = await data;
  return await json;
});

const newSlice = createSlice({
  name: "new",
  initialState: {
    newPosts: "",
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNew.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadNew.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.newPosts = action.payload;
      })
      .addCase(loadNew.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default newSlice.reducer;
