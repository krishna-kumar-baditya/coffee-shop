import axiosInstance from "../../Api/axiosInstance";
import { endpoint } from "../../Api/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadUserAuthState = () => {
    try {
        const userToken = localStorage.getItem("userToken");
        const userData = localStorage.getItem("userData");
        if (userToken && userData) {
            return {
                loading: false,
                isUserLoggedIn: true,
                userToken: userToken,
                userData: JSON.parse(userData),
            };
        }
    } catch (error) {
        console.error("Error loading user auth state:", error);
    }
    return {
        loading: false,
        isUserLoggedIn: false,
        userToken: null,
        userData: null,
    };
};

const initialState = loadUserAuthState();

// User signup thunk
export const userSignup = createAsyncThunk(
    "userAuth/signup",
    async (formData, { rejectWithValue }) => {
        try {
            // Add role as "user" to distinguish from admin
            const userFormData = new FormData();
            for (let key in formData) {
                if (formData[key] instanceof File) {
                    userFormData.append(key, formData[key]);
                } else {
                    userFormData.append(key, formData[key]);
                }
            }
            userFormData.append("role", "user");

            let res = await axiosInstance.post(
                endpoint?.auth?.signup,
                userFormData
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);

// User signin thunk
export const userSignin = createAsyncThunk(
    "userAuth/signin",
    async (formData, { rejectWithValue }) => {
        try {
            // Add role as "user" to distinguish from admin
            // const userFormData = { ...formData, role: "user" };
            const userFormData = { ...formData };
            let res = await axiosInstance.post(
                endpoint?.auth?.signin,
                userFormData
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        checkUserToken: (state) => {
            const userToken = localStorage.getItem("userToken");
            const userData = localStorage.getItem("userData");
            if (userToken && userData) {
                state.isUserLoggedIn = true;
                state.userToken = userToken;
                state.userData = JSON.parse(userData);
            } else {
                state.isUserLoggedIn = false;
                state.userToken = null;
                state.userData = null;
            }
        },
        userLogout: (state) => {
            state.isUserLoggedIn = false;
            state.userToken = null;
            state.userData = null;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup cases
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(userSignup.fulfilled, (state, { payload }) => {
                state.loading = false;
                // Note: Signup doesn't automatically log in, user needs to sign in
            })
            .addCase(userSignup.rejected, (state) => {
                state.loading = false;
            })
            // Signin cases
            .addCase(userSignin.pending, (state) => {
                state.loading = true;
                state.isUserLoggedIn = false;
            })
            .addCase(userSignin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isUserLoggedIn = true;
                state.userToken = payload?.token;
                state.userData = payload?.user || payload?.data?.user || null;
                
                // Persist to localStorage
                localStorage.setItem("userToken", payload?.token);
                if (state.userData) {
                    localStorage.setItem("userData", JSON.stringify(state.userData));
                }
            })
            .addCase(userSignin.rejected, (state) => {
                state.loading = false;
                state.isUserLoggedIn = false;
            });
    },
});

export const { checkUserToken, userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;

