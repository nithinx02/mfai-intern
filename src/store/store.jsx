import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/UserSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default store;
