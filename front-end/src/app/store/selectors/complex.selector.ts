import { AppState } from "../states/app.state";

export const selectComplexes = (state: AppState) => state.complexStatus.complex
export const selectedComplex = (state: AppState) => state.complexStatus.selectedComplexId


export const selectCourts = (state: AppState) => state.complexStatus.courts
export const selectAvailable = (state: AppState) => state.complexStatus.avalaibleCourts
export const selectedCourt = (state: AppState) => state.complexStatus.selectedCorut

export const selectedLocation = (state: AppState) => state.complexStatus.complex.find(el => el.id === state.complexStatus.selectedComplexId)?.location;

export const myComplexes = (state: AppState) => state.complexStatus.complex.filter(el => el.owner === state.userStatus.user?.id)