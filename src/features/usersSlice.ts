import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UsersPayload } from '../types';
import { API_ENDPOINTS } from '../constants';
import { toast } from 'react-toastify';


interface UsersState {
  users: User[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  users: [],
  total: 0,
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    {
      limit = 5,
      skip = 0,
      key = '', 
      value = '',
    }: { limit?: number; skip?: number; key?: string; value?: string },
    { rejectWithValue }
  ) => {
    try {
       let url = API_ENDPOINTS.USERS;

      if (key && value) {
        url += `/filter?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
      } else {
        url += `?limit=${limit}&skip=${skip}`;
      }

      const response = await axios.get<UsersPayload>(url);

      return {
        users: response.data.users || [],
        total: response.data.total || 0,
      };

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Failed to fetch Users");
            return rejectWithValue(err.response?.data || "Failed to fetch Users");
          }
          toast.error("An unknown error occurred while fetching Users.");
        return rejectWithValue("An unknown error occurred while fetching Users.");
    }
    
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
