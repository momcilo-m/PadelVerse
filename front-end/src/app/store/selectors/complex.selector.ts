import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ComplexState } from "../reducers/complex.reducers";
import * as fromComplex from './../reducers/complex.reducers';
import { selectUserId } from "./user.selector";

export const selectComplexState = createFeatureSelector<ComplexState>('complexStatus');
const { selectAll, selectEntities, selectIds, selectTotal } = fromComplex.adapter.getSelectors();

//export const selectComplexes = (state: AppState) => state.complexStatus.complex
export const selectComplexes = createSelector(
    selectComplexState,
    selectAll
)

export const selectComplexEntities = createSelector(
    selectComplexState,
    selectEntities
);

export const selectedComplexID = createSelector(
    selectComplexState,
    state => state.selectedComplexId
);

//export const selectedComplexID = (state: AppState) => state.complexStatus.selectedComplexId
export const selectedComplex = createSelector(
    selectComplexEntities,
    selectedComplexID,
    (entities, id) => (id !== null ? entities[id] : null)
);

export const complexCount = createSelector(
    selectComplexState,
    selectTotal
)

export const myComplexes = createSelector(
    selectComplexes,
    selectUserId,
    (complexes, userId) => {
        if (!userId) return [];
        return complexes.filter(complex => complex.owner === userId);
    }
)

export const selectedLocation = createSelector(
    selectedComplex,
    complex => complex?.location
)

// export const selectCourts = (state: AppState) => state.complexStatus.courts
// export const selectAvailable = (state: AppState) => state.complexStatus.avalaibleCourts
// export const selectedCourt = (state: AppState) => state.complexStatus.selectedCorut

// //export const selectedLocation = (state: AppState) => state.complexStatus.complex.find(el => el.id === state.complexStatus.selectedComplexId)?.location;
// //export const selectedComplex = (state: AppState) => state.complexStatus.complex.find(el => el.id === state.complexStatus.selectedComplexId)

// export const myComplexes = (state: AppState) => state.complexStatus.complex.filter(el => el.owner === state.userStatus.user?.id)

// export const complexCount = (state: AppState) => state.complexStatus.count