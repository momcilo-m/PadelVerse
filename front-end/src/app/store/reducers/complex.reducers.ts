import { createReducer, on } from "@ngrx/store"
import { Complex } from "../../components/complex/complex"
import { ComplexState } from "../states/complex.state"
import { failedComplex, loadComlpex, loadedComplex } from "../actions/complex.action"

export const initComplexState : ComplexState =
{
    selectedComplex:null,
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
    on(loadedComplex,(state,com)=>{
        return {
            ...state,
            complex:com.complexes
        }
    })
)