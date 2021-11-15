import { createSlice } from '@reduxjs/toolkit';
import { PhoneNumber } from 'libphonenumber-js/types';

import { UserPhoto } from '../../interfaces';

const initialState: User = {
  firstName: '',
  lastName: '',
  phoneNumber: undefined,
  userPhoto: undefined,
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
  },
});

interface User {
  firstName: string;
  lastName: string;
  phoneNumber: Partial<PhoneNumber> | undefined;
  userPhoto: UserPhoto | undefined;
}
