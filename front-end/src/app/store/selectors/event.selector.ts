import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventState } from "../reducers/events.reducer";
import * as fromEvent from './../reducers/events.reducer';

export const selectEventhState = createFeatureSelector<EventState>('eventStatus');
const { selectAll, selectEntities, selectIds, selectTotal } = fromEvent.adapter.getSelectors();


export const selectEventEntities = createSelector(
    selectEventhState,
    selectEntities
);

export const selectEventsID = createSelector(
    selectEventhState,
    (state) => [...state.ids].reverse()
);

export const selectEvents = createSelector(
    selectEventEntities,
    selectEventsID,
    (dir, ids) => ids.map(id => dir[id])
)
    // export const selectEvents = createSelector(
    //     selectEventhState,
    //     selectAll
    // )
