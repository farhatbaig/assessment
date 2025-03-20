import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../types';
import { API_ENDPOINTS } from '../constants';
import { toast } from 'react-toastify';

interface PostState {
  posts: Post[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PostState = {
  posts: [],
  total: 0,
  status: 'idle',
};
const url =  API_ENDPOINTS.POSTS;
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Post[]>(url);
      return { posts: response.data, total: response.data.length };

    } catch (err) {
      console.error(err);
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addUser',

  async (post: Post, { rejectWithValue }) => {
    try {
      const response = await axios.post<Post>(
        url,
        post,
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
      );
      if (response.status === 201 || response.status === 200) {
        toast.success('Post added successfully');
      }
      return response.data;
      
    } catch (err) {
      toast.error('Failed to add post');
      console.error(err);
      return rejectWithValue('Failed to add post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updateUser',
  async (
    { id, postData }: { id: number; postData: Post },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put<Post>(
        `${url}/${id}`,
        postData,
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
      );
      if (response.status === 201 || response.status === 200) {
        toast.success('Post Updated successfully');
      }
      return response.data;
    } catch (err) {
      toast.error('Failed to update post');

      console.error(err);
      return rejectWithValue('Failed to update post ',);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/${id}`);
      toast.success('Post Delete successfully');
      return id;
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete post');
      return rejectWithValue('Failed to delete post');
    }
  }
);

export const fetchFilteredPosts = createAsyncThunk(
  'posts/fetchFilteredPosts',
  async ({ key, value }: { key: string; value: string }, { rejectWithValue }) => {
    try {
      const urlFilter = `${url}?${key}=${encodeURIComponent(
        value
      )}`;
      const response = await axios.get<Post[]>(urlFilter);
      return { posts: response.data, total: response.data.length };
    } catch (err) {
      console.error(err);
      return rejectWithValue('Failed to fetch filtered posts');
    }
  }
);

const usersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.total += 1;
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.total -= 1;
      })

      .addCase(fetchFilteredPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.total = action.payload.total;
      });
  },
});

export default usersSlice.reducer;
