import { createAction, props } from "@ngrx/store";
import { ComplexInterface } from "../../models/complex.interface";
import { CreateComplex } from "../../models/create.complex.interface";

export const loadComlpex = createAction("loadComplex")
export const loadedComplex = createAction('loadedComplex', props<{ complexes: ComplexInterface[] }>());
export const failedComplex = createAction('failedComplex', props<{ message: string }>());
export const selectComplex = createAction('selectComplex', props<{ id: number }>())
export const addComplex = createAction('addComplex', props<{ complex: ComplexInterface }>())

export const createComplex = createAction('createComplex', props<{ complex: CreateComplex }>())
export const editComplex = createAction('editComplex', props<{ complex: CreateComplex, id: number }>())
export const editComplexSuccessFully = createAction('editComplexSuccessFully', props<{ complex: CreateComplex, id: number }>())
// export const createComplexSuccessfully = createAction('createComplexSuccessfully', props<{ complex: ComplexInterface }>)

export const loadCourts = createAction('loadCourts', props<{ complex: number, date: string, time: string, count: number }>());
export const loadedCourts = createAction('loadedCourts', props<{ courts: CourtInterface[], avalaible: number[] }>())
export const failedCourts = createAction('failedCourts', props<{ message: string }>())
export const selectCourt = createAction('selectCourt', props<{ id: number }>())

export const createCourt = createAction('createCourt', props<{ court: CourtInterface }>())
export const addCourt = createAction('addCourt', props<{ court: CourtInterface }>())

export const booking = createAction("booking", props<{ complex: number, court: number, count: number }>())
export const bookingSuccess = createAction("bookingSuccess", props<{ id: string }>());
export const bookingFailed = createAction('bookingFailed', props<{ message: string }>())

export const userComplex = createAction("userComplex", props<{ id: number }>())
export const userComplexSuccessfully = createAction("userComplexSuccessfully", props<{ complex: ComplexInterface[] }>())
export const userComplexFailed = createAction("userComplexFailed", props<{ message: string }>())