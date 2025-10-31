import { createReducer, on } from "@ngrx/store"
import { addComplex, addCourt, editComplexSuccess, failedComplex, loadComlpex, loadedComplex, loadedCourts, selectComplex, selectCourt, updateReview, uploadComplexImageSuccess, userComplexSuccess } from "../actions/complex.action"
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ComplexInterface } from "../../models/complex.interface";

//import { ComplexStateInterface } from "../states/complex.state.interface"
// export const initComplexState: ComplexState =
// {
//     selectedComplexId: -1,
//     complex: [],
//     courts: [],
//     avalaibleCourts: [],
//     selectedCorut: -1,
//     count: 0
// }


export interface ComplexState extends EntityState<ComplexInterface> {
    selectedComplexId: number,
}

export const adapter = createEntityAdapter<ComplexInterface>();

export const initialState: ComplexState = adapter.getInitialState({
    selectedComplexId: -1
});

export const complexReducer = createReducer(
    initialState,

    on(loadComlpex, failedComplex, (state) => {
        return adapter.removeAll(state);
    }),

    on(loadedComplex, (state, payload) => {
        const { complexes, count } = payload

        return adapter.setAll(complexes, {
            ...state,
        })
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
    // on(loadedCourts, (state, payload) => {
    //     console.log(payload)
    //     return {
    //         ...state,
    //         courts: payload.courts || [],
    //         avalaibleCourts: payload.avalaible || []
    //     }
    // }),
    // on(selectCourt, (state, payload) => {
    //     return {
    //         ...state,
    //         selectedCorut: payload.id
    //     }
    // }),

    on(addComplex, (state, { complex }) => {
        return adapter.addOne(complex, state);
    }),

    on(userComplexSuccess, (state, { complex }) => {

        // let notInList = payload.complex.filter((complex) => !state.complex.find(c => c.id === complex.id))
        // return {
        //     ...state,
        //     complex: [...state.complex, ...notInList]
        // }
        return adapter.addMany(complex, state);
    }),
    // on(addCourt, (state, payload) => {
    //     let finded = state.courts.find(el => el.id === payload.court.id);
    //     return {
    //         ...state,
    //         courts: finded ? [...state.courts] : [...state.courts, payload.court]
    //     }
    // }),
    on(editComplexSuccess, (state, { complex, id }) => {

        const [x, y] = complex.location.slice(1, -1).split(",").map(Number);

        // return {
        //     ...state,
        //     complex: state.complex.map(item => item.id === id ? { ...item, ...complex, location: { x, y } } : item)
        // };

        return adapter.updateOne({ id, changes: { ...complex, location: { x, y } } }, state);
    }),
    on(uploadComplexImageSuccess, (state, { id, path: photo }) => {

        // return {
        //     ...state,
        //     complex: state.complex.map(cmp => cmp.id === id ? { ...cmp, photo: path } : cmp)
        // };

        return adapter.updateOne({ id, changes: { photo } }, state);
    }),
    on(updateReview, (state, { rating: reviews, id }) => {
        // return {
        //     ...state,
        //     complex: state.complex.map(cmp => cmp.id === id ? { ...cmp, reviews: rating } : cmp)
        // }
        return adapter.updateOne({ id, changes: { reviews } }, state);
    })

)