import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; 
import { Product, ProductsPayload } from "../types";
import { API_ENDPOINTS } from "../constants";

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { limit = 5, skip = 0, key = "", value = "", category = "" }: 
    { limit?: number; skip?: number; key?: string; value?: string; category?: string },
    { rejectWithValue }
  ) => {
    try {
      let url = API_ENDPOINTS.PRODUCTS;

      if (category) {
        url = `${API_ENDPOINTS.PRODUCTS}/category/${encodeURIComponent(category)}`;
      } else if (key && value) {
        url += `/filter?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
      } else {
        url += `?limit=${limit}&skip=${skip}`;
      }

      const response = await axios.get<ProductsPayload>(url);
      
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to fetch products");
        return rejectWithValue(err.response?.data || "Failed to fetch products");
      }
      toast.error("An unknown error occurred while fetching products.");
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
