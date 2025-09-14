import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";


export const selectWeather = (state:AppState)=> state.weatherStatus;