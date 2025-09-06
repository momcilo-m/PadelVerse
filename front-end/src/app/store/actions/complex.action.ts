import { createAction, props } from "@ngrx/store";
import { ComplexInterface } from "../../models/complex.interface";

export const loadComlpex = createAction("loadComplex")
export const loadedComplex = createAction('loadedComplex',props<{complexes:ComplexInterface[]}>());
export const failedComplex = createAction('failedComplex',props<{message:string}>());
export const selectComplex = createAction('selectComplex',props<{id:number}>())

export const loadCourts = createAction('loadCourts',props<{complex:number, date:string, time:string, count:number}>());
export const loadedCourts = createAction('loadedCourts',props<{courts:CourtInterface[],avalaible:number[]}>())
export const failedCourts = createAction('failedCourts',props<{message:string}>())
export const selectCourt = createAction('selectCourt',props<{id:number}>())

