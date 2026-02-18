import axiosInstance from "../../Api/axiosInstance";
import { endpoint } from "../../Api/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadUserAuthState = () => {
    try {
        const userToken = localStorage.getItem("userToken");
        if (userToken ) {
            return {
                loading: false,
                isUserLoggedIn: !!userToken,
            };
        }
    } catch (error) {
        console.error("Error loading user auth state:", error);
    }
    return {
        loading: false,
        isUserLoggedIn: false,
    };
};

const initialState = loadUserAuthState();

// User signup thunk
export const userSignup = createAsyncThunk(
    "userAuth/signup",
    async (formData, { rejectWithValue }) => {
        try {
            // Ensure role is always attached for user registration.
            const userFormData =
                formData instanceof FormData ? formData : new FormData();
            if (!(formData instanceof FormData)) {
                Object.entries(formData || {}).forEach(([key, value]) => {
                    userFormData.append(key, value);
                });
            }
            userFormData.append("role", "user");

            let res = await axiosInstance.post(
                endpoint?.auth?.signup,
                userFormData,
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    },
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
                userFormData,
            );
            let resData = res?.data;

            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    },
);

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        checkUserToken: (state) => {
            const userToken = localStorage.getItem("userToken");
            
            if (userToken ) {
                state.isUserLoggedIn = true;
                
            } else {
                state.isUserLoggedIn = false;
            }
        },
        userLogout: (state) => {
            state.isUserLoggedIn = false;
            localStorage.removeItem("userToken");
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup cases
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(userSignup.fulfilled, (state) => {
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
            })
            .addCase(userSignin.rejected, (state) => {
                state.loading = false;
                state.isUserLoggedIn = false;
            });
    },
});

export const { checkUserToken, userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
