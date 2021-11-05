import { createSlice } from '@reduxjs/toolkit';

const initialState: View = {
  currentScreen: '',
  entryPoint: '',
};

export const view = createSlice({
  name: 'view',
  initialState,
  reducers: {
    gotoScreen: (state, action) => {
      state = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setEntryPoint: (state, action) => {
      state.entryPoint = action.payload;
    },
  },
});

interface View {
  currentScreen: string;
  entryPoint: string;
}
