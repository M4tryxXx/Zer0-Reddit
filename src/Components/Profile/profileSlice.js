import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { currentToken } from "../Auth/Auth";

export const loadProfile = createAsyncThunk("profile/getProfile", async () => {
  const data = fetch("https://oauth.reddit.com/api/v1/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "bearer " + currentToken.access_token,
    },
  }).then((data) => {
    return data.json();
  });
  const json = await data;
  return await json;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: "",
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.profile = action.payload;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default profileSlice.reducer;
