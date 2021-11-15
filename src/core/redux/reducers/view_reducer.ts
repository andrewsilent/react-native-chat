import { createSlice } from '@reduxjs/toolkit';

const initialState: View = {
  currentScreen: '',
  entryPoint: '',
  devicePlatform: {
    OS: '',
    isTesting: false,
  },
};

export const view = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setEntryPoint: (state, action) => {
      state.entryPoint = action.payload;
    },
    setDevicePlatform: (state, action) => {
      state.devicePlatform = action.payload;
    },
  },
});

interface View {
  currentScreen: string;
  entryPoint: string;
  devicePlatform: {
    OS: string;
    isTesting: boolean;
  };
}
