import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MatchState } from "../reducers/match.reducers";
import * as fromMatch from './../reducers/match.reducers';

export const selectMatchState = createFeatureSelector<MatchState>('matchStatus');
const { selectAll, selectEntities, selectIds, selectTotal } = fromMatch.adapter.getSelectors();

export const selectMatches = createSelector(
    selectMatchState,
    selectAll
)

export const selectMatchEntities = createSelector(
    selectMatchState,
    selectEntities
);

export const selectedMatchID = createSelector(
    selectMatchState,
    state => state.selectedMatchId
);

export const selectedMatch = createSelector(
    selectMatchEntities,
    selectedMatchID,
    (entities, id) => (id !== null ? entities[id] : null)
);