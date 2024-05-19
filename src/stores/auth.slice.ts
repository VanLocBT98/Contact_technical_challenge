import { createSlice } from '@reduxjs/toolkit';

import { IUserResponse } from '~/services/auth/types';

interface IAuthState {
  currentUser: IUserResponse | null;
  loadingProfile: boolean | null;
}

const initialState: IAuthState = {
  currentUser: null,
  loadingProfile: null
};

/* Creating a slice of the redux store. */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload !== null ? { ...(action.payload as IUserResponse) } : null;
    },
    setProfileLoading: (state, action) => {
      state.loadingProfile = action.payload;
    }
  }
});

export const { setCurrentUser, setProfileLoading } = authSlice.actions;

export default authSlice.reducer;
