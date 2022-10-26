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
  accounts: [],
  current: {},
  edit: {},
  error: "",
};
/* #endregion */

//TODO return type object
/* #region - Login */
export const loginUser = createAsyncThunk(
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

      document.cookie = `token=${data.token}; max-age=${60 * 60 * 24 * 14}`; //2 weeks
      return { email };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region - Register */
export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${server.communicationsAPI}/users/register`,
        { fullName: name, email, password },
        { headers }
      );

      if (response.data.message === "User already exists") {
        alert("User already exists");
        return;
      }

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

//TODO PayloadAction type
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* #region - Login */
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.current = action.payload;
        state.error = "";
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.current = {};
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Register */
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export default userSlice.reducer;
