import { createSlice } from '@reduxjs/toolkit';

// Support simple persistence across refresh
const persistedAuth = localStorage.getItem('smit_auth_session');
const parsedAuth = persistedAuth ? JSON.parse(persistedAuth) : null;

const initialState = parsedAuth || {
  user: null, 
  session: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isAuthenticated = !!action.payload.user;

      // Save for refresh
      localStorage.setItem('smit_auth_session', JSON.stringify({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated
      }));
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      localStorage.removeItem('smit_auth_session');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;