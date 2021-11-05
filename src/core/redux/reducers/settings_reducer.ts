import { createSlice } from '@reduxjs/toolkit';

const initialState: Settings = {
  lang: 'us',
  theme: 'light',
  value: 0,
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});

interface Settings {
  lang: string;
  theme: string;
  value: number;
}
