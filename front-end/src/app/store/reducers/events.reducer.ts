import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { MatchEventInterface } from "../../models/match.event.interface";
import { createReducer, on } from "@ngrx/store";
import { addEvent, evetnsSuccess, loadEvetns } from "../actions/events.action";

export interface EventState extends EntityState<MatchEventInterface> { }

export const adapter = createEntityAdapter<MatchEventInterface>();

export const initialState: EventState = adapter.getInitialState({});

export const eventReducer = createReducer(
    initialState,

    on(loadEvetns, (state) => {
        return adapter.removeAll(state);
    }),

    on(evetnsSuccess, (state, { events }) => {
        return adapter.addMany(events, state);
    }),

    on(addEvent, (state, { event }) => {
        return adapter.addOne(event, state);
    })
)
