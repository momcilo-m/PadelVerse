import { createAction, props } from "@ngrx/store";
import { MatchInterface } from "../../models/match.interface";
import { MatchStatsInterface } from "../../models/match.stats.interface";

export const liveMatch = createAction("liveMatch")
export const liveMatchSuccess = createAction("liveMatchSuccess", props<{ matches: MatchInterface[] }>())
export const matchStats = createAction("matchStats", props<{ id: number }>())
export const matchStatsSuccess = createAction("matchStatsSuccess", props<{ stats: MatchStatsInterface }>())
export const matchFail = createAction("matchFail", props<{ message: string }>())
export const selectMatch = createAction("selectMatch", props<{ id: number }>())
export const matchAndLiveSuccess = createAction("matchAndLiveSuccess", props<{ stats: MatchStatsInterface, match: MatchInterface }>());