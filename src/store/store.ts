import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../services/userSlice';
import {usersApi} from '../services/apiSlices.ts'
import inputSlice from '../services/inputSlice.ts';

export const store = configureStore({
  reducer: {
    user: userSlice,
    input: inputSlice,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
