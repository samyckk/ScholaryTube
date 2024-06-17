import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoDetails : null,
  loading: false,
  error: false
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
   fetchVideo : (state,action)=>{
      state.videoDetails = action.payload;
   }
  },
})

// Action creators are generated for each case reducer function
export const { fetchVideo} = videoSlice.actions;

export default videoSlice.reducer;