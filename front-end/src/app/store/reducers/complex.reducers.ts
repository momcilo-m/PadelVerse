import { createReducer, on } from "@ngrx/store"
import { ComplexState } from "../states/complex.state"
import { addComplex, failedComplex, failedCourts, loadComlpex, loadCourts, loadedComplex, loadedCourts, selectComplex, selectCourt, userComplexSuccessfully } from "../actions/complex.action"

export const initComplexState: ComplexState =
{
    selectedComplexId: -1,
    complex: [],
    courts: [],
    avalaibleCourts: [],
    selectedCorut: -1,
}

export const complexReducer = createReducer(
    initComplexState,
    on(loadComlpex, failedComplex, (state) => {
        return {
            ...state,
            complex: []
        }
    }),
    on(loadedComplex, (state, payload) => {
        return {
            ...state,
            complex: payload.complexes
        }
    }),
    on(selectComplex, (state, payload) => {
        return {
            ...state,
            selectedComplexId: payload.id
        }
    }),
    on(loadCourts, failedCourts, (state) => {
        return {
            ...state,
            courts: [],
            avalaibleCourts: []
        }
    }),
    on(loadedCourts, (state, payload) => {
        console.log(payload)
        return {
            ...state,
            courts: payload.courts,
            avalaibleCourts: payload.avalaible
        }
    }),
    on(selectCourt, (state, payload) => {
        return {
            ...state,
            selectedCorut: payload.id
        }
    }),
    on(addComplex, (state, payload) => {
        return {
            ...state,
            complex: [...state.complex, payload.complex]
        }
    }),
    on(userComplexSuccessfully, (state, payload) => {
        return {
            ...state,
            complex: [...state.complex, ...payload.complex]
        }
    })
)