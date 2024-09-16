import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectIsSidebarCollapse = (state: RootState) =>
  state.user.isSidebarCollapse;
