import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { currentToken } from "../Auth/Auth";
import { useSelector } from "react-redux";

export const loadPopular = createAsyncThunk(
  "popular/getPopular",
  async (next) => {
    const data = fetch("https://oauth.reddit.com/r/popular", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: "bearer " + currentToken.access_token,
      },
      limit: 50,
      count: 555,
      before: next,
    }).then((data) => {
      return data.json();
    });
    const json = await data;
    return await json;
  }
);

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    popularPosts: "",
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPopular.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadPopular.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.popularPosts = action.payload;
      })
      .addCase(loadPopular.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default popularSlice.reducer;
