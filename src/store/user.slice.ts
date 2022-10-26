import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server, getCookie } from "../utils/global";
import { UserState } from "../types/store";

//#region - Token
let token: string = getCookie("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//#endregion

/* #region  - Initial state */
const initialState: UserState = {
  loading: false,
  accounts: {},
  current: {},
  edit: {},
  error: "",
};
/* #endregion */

/* #region - Login */
const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${server.communicationsAPI}/users/login`,
        { email, password },
        { headers }
      );

      const data = response.data;

      if (data.success === false) {
        return false;
      }

      document.cookie = `token=${data.result}; max-age=${60 * 60 * 24 * 14}`; //2 weeks
      return true;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region - User slice */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{}>) => {
      state.loading = false;
      state.accounts = action.payload;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.accounts = [];
      state.error = action.error.message;
    });
  },
});
/* #endregion */

export default userSlice.reducer;
