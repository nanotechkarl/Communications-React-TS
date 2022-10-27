import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server, getCookie, logout } from "../utils/global";
import { ChatState } from "../types/store";

/* #region  - Initial state */
const initialState: ChatState = {
  loading: false,
  history: [],
  error: "",
};
/* #endregion */

export const getChats = createAsyncThunk(
  "chats/getChats",
  async (args, thunkApi) => {
    try {
      const token: string = getCookie("token");
      const response = await axios.get(`${server.communicationsAPI}/chats`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response :", response);

      const result = response.data;
      if (result && result.message === "User does not exist") logout();

      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* #region - Login */
    builder.addCase(getChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChats.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.history = action.payload;
      state.error = "";
    });
    builder.addCase(getChats.rejected, (state, action) => {
      state.loading = false;
      state.history = [];
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export default chatsSlice.reducer;
