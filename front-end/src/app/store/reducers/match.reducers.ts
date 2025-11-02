import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { MatchInterface } from "../../models/match.interface";
import { MatchStatsInterface } from "../../models/match.stats.interface";
import { createReducer, on } from "@ngrx/store";
import { liveMatch, liveMatchSuccess, matchAndLiveSuccess, matchStats, matchStatsSuccess, selectMatch } from "../actions/match.action";

export interface MatchState extends EntityState<MatchInterface> {
    selectedMatchId: number,
    selectedMatchStats: MatchStatsInterface | null
}

export const adapter = createEntityAdapter<MatchInterface>();

export const initialState: MatchState = adapter.getInitialState({
    selectedMatchId: -1,
    selectedMatchStats: null
});

export const matchReducers = createReducer(
    initialState,

    on(liveMatch, state => adapter.removeAll(state)),

    on(liveMatchSuccess, (state, { matches }) => adapter.addMany(matches, state)),

    on(matchStats, state => ({
        ...state,
        selectedMatchStats: null
    })),

    on(matchStatsSuccess, (state, { stats }) => ({
        ...state,
        selectedMatchStats: stats
    })),

    on(selectMatch, (state, { id }) => ({
        ...state,
        selectedMatchId: id
    })),

    on(matchAndLiveSuccess, (state, { stats, match }) => ({
        ...adapter.addOne(match, state),
        selectedMatchStats: stats
    })),
)
