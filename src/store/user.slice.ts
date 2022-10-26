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

/* #region - Login/Register */
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
      return { email, id: data.id };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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

/* #region - GET */
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (arg, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.get(`${server.communicationsAPI}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getUserObject = createAsyncThunk(
  "user/myProperties",
  async (arg, thunkApi) => {
    try {
      const response = await axios.get(
        `${server.communicationsAPI}/users/property`,
        { headers }
      );
      console.log("response :", response);

      // const result = response.data;
      // return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async ({ id }: { id: number }, thunkApi) => {
    try {
      const response = await axios.get(
        `${server.communicationsAPI}/users/property/${id}`,
        {
          headers,
        }
      );
      // const result = response.data;
      console.log("response :", response);

      // return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region - Edit/Delete */
export const editUser = createAsyncThunk(
  "user/editUser",
  async (
    { id, fullName, email }: { id: number; fullName: string; email: string },
    thunkApi
  ) => {
    try {
      const response = await axios.put(
        `${server.communicationsAPI}/users/${id}`,
        { fullName, email },
        {
          headers,
        }
      );
      console.log("response :", response);
      // return
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUser",
  async ({ id }: { id: number }, thunkApi) => {
    try {
      const response = await axios.delete(
        `${server.communicationsAPI}/users/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response :", response);
      // return
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

    /* #region - Get users */
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.accounts = action.payload;
      state.error = "";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.accounts = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get current user */
    builder.addCase(getUserObject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserObject.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.current = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getUserObject.rejected, (state, action) => {
      state.loading = false;
      state.current = {};
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get user by ID */
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.edit = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.edit = {};
      state.error = action.error.message;
    });
    /* #endregion */

    //TODO payload
    /* #region - Edit user */
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    //TODO payload
    /* #region - Delete user */
    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUserById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export default userSlice.reducer;
