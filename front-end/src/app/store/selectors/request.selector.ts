import { AppState } from "../states/app.state";

export const selectLoading = (state:AppState)=> state.requestStatus.loading