import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { currentToken } from "../Auth/Auth";
import { useSelector } from "react-redux";

export const loadTop = createAsyncThunk("popular/getPopular", async (next) => {
  const data = fetch("https://oauth.reddit.com/top", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "bearer " + currentToken.access_token,
    },
    count: 555,
    before: next,
  }).then((data) => {
    return data.json();
  });
  const json = await data;
  return await json;
});

const topSlice = createSlice({
  name: "top",
  initialState: {
    topPosts: "",
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTop.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadTop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.topPosts = action.payload;
      })
      .addCase(loadTop.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default topSlice.reducer;
