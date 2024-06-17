import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.userDetails = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state.userDetails.subscribedUsers.includes(action.payload)) {
        state.userDetails.subscribedUsers.splice(
          state.userDetails.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ), 1);
      } else {
        state.userDetails.subscribedUsers.push(action.payload);
      }
    },
    likeRedux: (state, action) => {
      if (state.userDetails.dislikedVids.includes(action.payload)) {
        state.userDetails.dislikedVids.splice(
          state.userDetails.dislikedVids.findIndex(
            (videoId) => videoId === action.payload
          ), 1);
      }
      if (!state.userDetails.likedVids.includes(action.payload)) {
        state.userDetails.likedVids.push(action.payload);
      }
    },
    dislikeRedux: (state, action) => {
      if (state.userDetails.likedVids.includes(action.payload)) {
        state.userDetails.likedVids.splice(
          state.userDetails.likedVids.findIndex(
            (videoId) => videoId === action.payload
          ), 1);
      }
      if (!state.userDetails.dislikedVids.includes(action.payload)) {
        state.userDetails.dislikedVids.push(action.payload);
      }
    },
    roleRedux : (state, action)=>{
      state.userDetails.role = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, subscription, likeRedux, dislikeRedux,roleRedux } = userSlice.actions;

export default userSlice.reducer;
