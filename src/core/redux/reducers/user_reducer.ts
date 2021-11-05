import { createSlice } from '@reduxjs/toolkit';
import { PhoneNumber, UserPhoto } from '../../interfaces';

const initialState: User = {
  firstName: '',
  lastName: '',
  phoneNumber: { code: '', number: '' },
  userPhoto: { localUri: '', height: undefined, width: undefined },
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserInfo: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

interface User {
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  userPhoto: UserPhoto;
}
