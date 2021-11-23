import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../interfaces';

const initialState: User = {
  firstName: '',
  lastName: '',
  phoneNumber: {},
  userPhoto: undefined,
  story: {},
  contacts: [],
  lastActivity: undefined,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserInfo: (state, action) => {
      const { payload } = action;
      if (payload.firstName) {
        state.firstName = payload.firstName;
      }
      if (payload.lastName) {
        state.lastName = payload.lastName;
      }
      if (payload.userPhoto) {
        state.userPhoto = payload.userPhoto;
      }
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setLastActivity: (state, action) => {
      state.lastActivity = action.payload;
    },
  },
});
