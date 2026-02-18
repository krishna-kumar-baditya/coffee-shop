import axiosInstance from "../../Api/axiosInstance";
import { endpoint } from "../../Api/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loadAdminAuthState = () => {
    const token = localStorage.getItem("token");

    return {
        loading: false,
        isLogin: !!token,
        isRegister: false,
    };
};

const initialState = loadAdminAuthState();

export const signup = createAsyncThunk(
    "auth/signup",
    async (formData, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.post(
                endpoint?.auth?.signup,
                formData,
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    },
);
export const signin = createAsyncThunk(
    "auth/signin",
    async (formData, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.post(
                endpoint?.auth?.signin,
                formData,
            );
            let resData = res?.data;
            console.log("resData ", resData);
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    },
);

export const authSlice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        checkToken: (state) => {
            console.log("check token called");
            
            const token = localStorage.getItem("token");
            console.log("token ", token);

            if (token) {
                state.isLogin = true;
                console.log("state.isLogin ", state.isLogin);
            } else {
                state.isLogin = false;
                console.log("state.isLogin ", state.isLogin);
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
                state.loading = false;
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
                state.loading = false;
                state.isLogin = false;
            });
    },
});

export const { checkToken, logout } = authSlice.actions;
