
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload.email;
    },
    clearEmail: (state) => {
      state.email = "";
    },
  },
});

export const { updateEmail, clearEmail } = userSlice.actions;

export default userSlice.reducer;
