import { createAction, props } from "@ngrx/store";
import { ComplexInterface } from "../../models/complex.interface";

export const loadComlpex = createAction("loadComplex")
export const loadedComplex = createAction('loadedComplex',props<{complexes:ComplexInterface[]}>());
export const failedComplex = createAction('failedComplex',props<{message:string}>());
export const selectComplex = createAction('selectComplex',props<{id:number}>())