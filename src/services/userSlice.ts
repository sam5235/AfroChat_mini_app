import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  access_token: string | null;
  refresh_token: string | null;
  token_type: string | null;
  user: object | null; 
}

const initialState: UserState = {
  access_token: null,
  refresh_token: null,
  token_type: null,
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSession(state, action: PayloadAction<UserState>) {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token
      state.token_type = action.payload.token_type
      state.user = action.payload.user
    },
  },
});

export const { setUserSession } = userSlice.actions;
export default userSlice.reducer;
