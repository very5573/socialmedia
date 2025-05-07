import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],  // ✅ Image posts
  reels: []   // ✅ Video reels
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // ✅ New post at top
    },
    setReels: (state, action) => {
      state.reels = action.payload;
    },
    addReel: (state, action) => {
      state.reels.unshift(action.payload); // ✅ New reel at top
    },
  },
});

export const { setPosts, addPost, setReels, addReel } = feedSlice.actions;

export default feedSlice.reducer;
