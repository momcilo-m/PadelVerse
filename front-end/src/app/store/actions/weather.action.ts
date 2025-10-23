import { createAction, props } from "@ngrx/store"

export const weather = createAction("weather", props<{ date: string, hour: string }>())
export const weatherSuccess = createAction("weatherSuccess", props<{ data: ForecastResponse, hour: number }>())
export const weatherFailed = createAction("weatherFailed", props<{ message: string }>()) 