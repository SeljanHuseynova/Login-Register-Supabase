import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const logInURL = process.env.REACT_APP_LOG_IN_URL;
const signUpURL = process.env.REACT_APP_SIGN_UP_URL;

const headers = {
  apiKey: apiKey,
  Authorization: `Bearer ${apiKey}`,
};


export const logIn = createAsyncThunk(
  "users/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        logInURL,
        {
          email: userData.email,
          password: userData.password,
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpeted error occurred"
      );
    }
  }
);

export const register = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        signUpURL,
        {
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              full_name: userData.username,
            },
          },
        },
        { headers }
      );
      return   console.log(response);
    
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response ? error.response.data : "an unexpected erorr occurred"
      );
    }
  }
);


const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: null,
    error: null,
    success: null, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = "Registration successful! Please verify your email.";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
