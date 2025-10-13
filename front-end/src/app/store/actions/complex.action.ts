import { createAction, props } from "@ngrx/store";
import { ComplexInterface } from "../../models/complex.interface";
import { CreateComplex } from "../../models/create.complex.interface";

export const loadComlpex = createAction("loadComplex")
export const selectComplex = createAction('selectComplex', props<{ id: number }>())
export const addComplex = createAction('addComplex', props<{ complex: ComplexInterface }>())
export const createComplex = createAction('createComplex', props<{ complex: CreateComplex }>())
export const editComplex = createAction('editComplex', props<{ complex: CreateComplex, id: number }>())

export const loadedComplex = createAction('loadedComplex', props<{ complexes: ComplexInterface[] }>());
export const editComplexSuccess = createAction('editComplexSuccess', props<{ complex: CreateComplex, id: number }>())

export const loadCourts = createAction('loadCourts', props<{ complex: number, date: string, time: string, count: number }>());
export const loadedCourts = createAction('loadedCourts', props<{ courts: CourtInterface[], avalaible: number[] }>())
export const selectCourt = createAction('selectCourt', props<{ id: number }>())

export const createCourt = createAction('createCourt', props<{ court: CourtInterface }>())
export const addCourt = createAction('addCourt', props<{ court: CourtInterface }>())

export const booking = createAction("booking", props<{ complex: number, court: number, count: number }>())
export const bookingSuccess = createAction("bookingSuccess", props<{ id: string }>());

export const userComplex = createAction("userComplex", props<{ id: number }>())
export const userComplexSuccess = createAction("userComplexSuccess", props<{ complex: ComplexInterface[] }>())

export const uploadComplexImage = createAction("uploadComplexImage", props<{ file: File, id: number }>())
export const uploadComplexImageSuccess = createAction("uploadComplexImageSuccess", props<{ path: string, id: number }>())

export const failedComplex = createAction('failedComplex', props<{ message: string }>());