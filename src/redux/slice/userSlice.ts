import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInitialState = {
  isAuth: boolean;
  isSidebarCollapse: boolean;
};

const initialState: userInitialState = {
  isAuth: false,
  isSidebarCollapse: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsSidebarCollapse: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapse = action.payload;
    },
  },
});

export const { setIsAuth, setIsSidebarCollapse } = userSlice.actions;

export default userSlice.reducer;
