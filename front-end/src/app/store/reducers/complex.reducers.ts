import { createReducer, on } from "@ngrx/store"
import { ComplexState } from "../states/complex.state"
import { failedComplex, loadComlpex, loadedComplex, selectComplex } from "../actions/complex.action"

export const initComplexState : ComplexState =
{
    selectedComplexId:-1,
    complex:[]
}

export const complexReducer = createReducer(
    initComplexState,
    on(loadComlpex,failedComplex,(state)=>{
        return {
            ...state,
            complex:[]
        }
    }),
    on(loadedComplex,(state,payload)=>{
        return {
            ...state,
            complex:payload.complexes
        }
    }),
    on(selectComplex,(state,payload)=>{
        return {
            ...state,
            selectedComplexId:payload.id
        }
    })
)