import { createSlice } from '@reduxjs/toolkit';

const initialState: View = {
  devicePlatform: {
    OS: '',
    isTesting: false,
  },
};

export const view = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setDevicePlatform: (state, action) => {
      state.devicePlatform = action.payload;
    },
  },
});

interface View {
  devicePlatform: {
    OS: string;
    isTesting: boolean;
  };
}
