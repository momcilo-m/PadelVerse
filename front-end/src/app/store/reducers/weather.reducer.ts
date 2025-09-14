import { createReducer, on } from "@ngrx/store"
import { weather, weatherSuccess } from "../actions/weather.action"

export const initWeatherState : WeatherState = 
{
    dateTime:"",
    icon:"",
    max_temp:-1,
    min_temp:-1,
    temp:-1,
    text:""
}

export const weatherReducer = createReducer(
    initWeatherState,

    on(weather,(state,{date,hour})=>{
        return {
            ...state,
            dateTime:date+hour
        }
    }),

    on(weatherSuccess,(state,{data})=>{
        return{
            ...state,
            icon:data.forecast.forecastday[0].hour[0].condition.icon,
            text:data.forecast.forecastday[0].hour[0].condition.text,
            max_temp : data.forecast.forecastday[0].day.maxtemp_c,
            min_temp : data.forecast.forecastday[0].day.mintemp_c,
            temp: data.forecast.forecastday[0].hour[0].temp_c
        }
    })
)
