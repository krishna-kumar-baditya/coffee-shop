import axiosInstance from "../../Api/axiosInstance";
import { endpoint } from "../../Api/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: null,
    profileData: [],
};

export const profileDetails = createAsyncThunk(
    "user/profileDetails",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.get(endpoint?.user?.profile_details);
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);


export const userSlice = createSlice({
    name : "userslice",
    initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(profileDetails.pending,(state)=>{
            state.loading = true
        })
        .addCase(profileDetails.fulfilled,(state,{payload})=>{
            console.log("profileData ",payload?.data);
            
            state.loading = false
            state.profileData = payload?.data
        })
        .addCase(profileDetails.rejected,(state)=>{
            state.loading = true
        })
    }
})