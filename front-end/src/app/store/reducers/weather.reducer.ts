import { createReducer, on } from "@ngrx/store"
import { weather, weatherSuccess } from "../actions/weather.action"

export const initWeatherState: WeatherState =
{
    dateTime: "",
    icon: "",
    max_temp: -1,
    min_temp: -1,
    temp: -1,
    text: ""
}

export const weatherReducer = createReducer(
    initWeatherState,

    on(weather, (state, { date, hour }) => {
        return {
            ...state,
            dateTime: date + hour
        }
    }),

    on(weatherSuccess, (state, { data, hour }) => {

        console.log(data.forecast)
        console.log(data.forecast.forecastday[0].hour, hour)

        return {
            ...state,
            icon: data.forecast.forecastday[0].hour[hour].condition.icon,
            text: data.forecast.forecastday[0].hour[hour].condition.text,
            temp: data.forecast.forecastday[0].hour[hour].temp_c,
            max_temp: data.forecast.forecastday[0].day.maxtemp_c,
            min_temp: data.forecast.forecastday[0].day.mintemp_c,
        }
    })
)
