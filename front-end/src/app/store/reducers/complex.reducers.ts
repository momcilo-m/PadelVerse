import { createReducer, on } from "@ngrx/store"
import { ComplexState } from "../states/complex.state"
import { addComplex, addCourt, editComplexSuccess, failedComplex, loadComlpex, loadedComplex, loadedCourts, selectComplex, selectCourt, uploadComplexImageSuccess, userComplexSuccess } from "../actions/complex.action"

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
        let notInList = payload.complexes.filter((complex) => !state.complex.find(c => c.id === complex.id))
        return {
            ...state,
            complex: [...state.complex, ...notInList]
        }
    }),
    on(selectComplex, (state, payload) => {
        return {
            ...state,
            selectedComplexId: payload.id
        }
    }),
    // on(loadCourts, failedCourts, (state) => {
    //     return {
    //         ...state,
    //         courts: [],
    //         avalaibleCourts: []
    //     }
    // }),
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
    on(userComplexSuccess, (state, payload) => {

        let notInList = payload.complex.filter((complex) => !state.complex.find(c => c.id === complex.id))
        return {
            ...state,
            complex: [...state.complex, ...notInList]
        }
    }),
    on(addCourt, (state, payload) => {
        let finded = state.courts.find(el => el.id === payload.court.id);
        return {
            ...state,
            courts: finded ? [...state.courts] : [...state.courts, payload.court]
        }
    }),
    on(editComplexSuccess, (state, { complex, id }) => {

        const [x, y] = complex.location.slice(1, -1).split(",").map(Number);

        return {
            ...state,
            complex: state.complex.map(item =>
                item.id === id
                    ? { ...item, ...complex, location: { x, y } }
                    : item
            )
        };
    }),
    on(uploadComplexImageSuccess, (state, { id, path }) => {
        return {
            ...state,
            complex: state.complex.map(cmp =>
                cmp.id === id ? { ...cmp, photo: path } : cmp
            )
        };
    })

)