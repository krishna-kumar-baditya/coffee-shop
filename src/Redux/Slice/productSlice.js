import axiosInstance from "../../Api/axiosInstance";
import { endpoint } from "../../Api/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: null,
    products: [],
    specificProducts: null,
};

export const insertProduct = createAsyncThunk(
    "auth/insertProduct",
    async (formData, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.post(
                endpoint?.product?.create,
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

export const productLists = createAsyncThunk(
    "auth/productLists",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.get(endpoint?.product?.productlist);
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);
export const getProducts = createAsyncThunk(
    "auth/getProducts",
    async (id, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.get(
                `${endpoint?.product?.product}/${id}`
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);
export const updateProducts = createAsyncThunk(
    "auth/updateProducts",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.put(
                `${endpoint?.product?.update}/${id}`,
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
export const deleteProducts = createAsyncThunk(
    "auth/deleteProducts",
    async (id, { rejectWithValue }) => {
        try {
            let res = await axiosInstance.delete(
                `${endpoint?.product?.delete}/${id}`
            );
            let resData = res?.data;
            return resData;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message;
            return rejectWithValue(message);
        }
    }
);
export const productSlice = createSlice({
    name: "productslice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(insertProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(insertProduct.rejected, (state) => {
                state.loading = true;
            })
            .addCase(productLists.pending, (state) => {
                state.loading = true;
            })
            .addCase(productLists.fulfilled, (state, { payload }) => {
                console.log("productlist payload ", payload?.data?.products);

                state.loading = false;
                state.products = payload?.data?.products;
            })
            .addCase(productLists.rejected, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                console.log("getProducts payload ", payload?.data);

                state.loading = false;
                state.specificProducts = payload?.data;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = true;
            })
            .addCase(updateProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProducts.fulfilled, (state, { payload }) => {
                console.log("updateProducts payload ", payload?.data);

                state.loading = false;
                // state.products = payload?.data?.products;
            })
            .addCase(updateProducts.rejected, (state) => {
                state.loading = true;
            })
            .addCase(deleteProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProducts.fulfilled, (state, { payload }) => {
                console.log("deleteProducts payload ", payload?.data);

                state.loading = false;
                // state.products = payload?.data?.products;
            })
            .addCase(deleteProducts.rejected, (state) => {
                state.loading = true;
            });
    },
});
