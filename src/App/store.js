import { configureStore } from "@reduxjs/toolkit";
import popularSlice from "../Components/Popular/popularSlice.js";
import newSlice from "../Components/New/newSlice.js";
import profileSlice from "../Components/Profile/profileSlice.js";
import topSlice from "../Components/Top/topSlice.js";

export const store = configureStore({
  reducer: {
    popular: popularSlice,
    new: newSlice,
    profile: profileSlice,
    top: topSlice,
  },
});
