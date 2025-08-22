import { AppState } from "../states/app.state";

export const selectUser = (state:AppState)=> state.userStatus.user;