import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menu:false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeMenu: (state) => {
      if(state.menu === true){
        state.menu = false;
      }
      else{
        state.menu = true;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeMenu} = menuSlice.actions;

export default menuSlice.reducer;
