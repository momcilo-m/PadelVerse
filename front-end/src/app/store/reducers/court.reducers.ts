import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addCourt, loadCourts, loadedCourts, selectCourt } from "../actions/complex.action";

export interface CourtState extends EntityState<CourtInterface> {
    avalaibleCourts: number[],
    selectedCourtId: number
}

export const adapter = createEntityAdapter<CourtInterface>();

export const initialState: CourtState = adapter.getInitialState({
    avalaibleCourts: [],
    selectedCourtId: -1
});

export const courtReducer = createReducer(
    initialState,

    on(loadCourts, (state) => {
        return adapter.removeAll({ ...state, avalaibleCourts: [] });
    }),

    on(loadedCourts, (state, { courts, avalaible }) => {
        return adapter.addMany(courts, { ...state, avalaibleCourts: avalaible });
    }),

    on(selectCourt, (state, { id }) => {
        return {
            ...state,
            selectedCourtId: id
        }
    }),

    on(addCourt, (state, { court }) => {
        return adapter.addOne(court, state);
    })
)