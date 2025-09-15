import axiosInstance from "../../Api/axiosInstance";
import { endpoint } from "../../Api/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: null,
    isLogin: false,
    isRegister: false,
};

export const signup = createAsyncThunk(
    "auth/signup",
    async (formData, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.post(
                endpoint?.auth?.signup,
                formData
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);
export const signin = createAsyncThunk(
    "auth/signin",
    async (formData, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.post(
                endpoint?.auth?.signin,
                formData
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        checkToken: (state) => {
            const token = localStorage.getItem("token");
            if (token !== null || token !== undefined || token !== "") {
                state.isLogin = true;
                console.log("isLogin ", state.isLogin);
            }
        },
        logout: (state) => {
            state.isLogin = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.isRegister = false;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.isRegister = true;
            })
            .addCase(signup.rejected, (state) => {
                state.loading = true;
                state.isRegister = false;
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
                state.isLogin = false;
            })
            .addCase(signin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLogin = true;
                localStorage.setItem("token", payload?.token);
            })
            .addCase(signin.rejected, (state) => {
                state.loading = true;
                state.isLogin = false;
            });
    },
});

export const { checkToken, logout } = authSlice.actions;
