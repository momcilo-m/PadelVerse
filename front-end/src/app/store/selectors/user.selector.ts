import { AppState } from "../states/app.states";

export const selectUser = (state:AppState)=> state.userStatus.user;
export const selectLoading = (state:AppState)=> state.userStatus.loading;