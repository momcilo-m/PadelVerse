import { createAction, props } from "@ngrx/store";
import { MatchEventInterface } from "../../models/match.event.interface";

export const loadEvetns = createAction("loadEvents", props<{ id: number }>())
export const evetnsSuccess = createAction("evetnsSuccess", props<{ events: MatchEventInterface[] }>())
export const addEvent = createAction('addEvent', props<{ event: MatchEventInterface }>())
export const eventFail = createAction('eventFail', props<{ message: string }>())