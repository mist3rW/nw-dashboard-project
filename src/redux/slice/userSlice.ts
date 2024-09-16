import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInitialState = {
  isAuth: boolean;
  isSidebarCollapse: boolean;
  isDarkMode: boolean;
};

const initialState: userInitialState = {
  isAuth: false,
  isSidebarCollapse: false,
  isDarkMode: false,
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
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsAuth, setIsSidebarCollapse, setIsDarkMode } =
  userSlice.actions;

export default userSlice.reducer;
