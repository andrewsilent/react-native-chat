import { createSlice } from '@reduxjs/toolkit';

const initialState: Settings = {
  lang: 'en',
  isDefaultTheme: true,
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.isDefaultTheme = action.payload;
    },
  },
});

interface Settings {
  lang: string;
  isDefaultTheme: boolean;
}
