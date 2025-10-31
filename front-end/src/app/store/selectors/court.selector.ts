import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourtState } from "../reducers/court.reducers";
import * as fromCourt from './../reducers/court.reducers';

export const selectCourtState = createFeatureSelector<CourtState>('courtStatus');
const { selectAll, selectEntities, selectIds, selectTotal } = fromCourt.adapter.getSelectors();

export const selectCourts = createSelector(
    selectCourtState,
    selectAll
)

export const selectCourtEntities = createSelector(
    selectCourtState,
    selectEntities
);

export const selectedCourtID = createSelector(
    selectCourtState,
    state => state.selectedCourtId
);

export const selectedCourt = createSelector(
    selectCourtEntities,
    selectedCourtID,
    (entities, id) => (id !== null ? entities[id] : null)
);

export const selectAvailable = createSelector(
    selectCourtState,
    (state) => state.avalaibleCourts
)