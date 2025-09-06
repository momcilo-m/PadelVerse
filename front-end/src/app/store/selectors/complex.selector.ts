import { AppState } from "../states/app.state";

export const selectComplexes = (state:AppState) => state.complexStatus.complex
export const selectedComplex = (state:AppState)=> state.complexStatus.selectedComplexId

export const selectCourts = (state:AppState) => state.complexStatus.courts
export const avalaibleCourts = (state:AppState)=> state.complexStatus.avalaibleCourts