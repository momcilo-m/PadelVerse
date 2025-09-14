import { createReducer, on } from "@ngrx/store"
import { RequestState } from "../states/request.state"
import { isLogin, login, loginFailed, loginSuccessfully } from "../actions/user.action"
import { booking, bookingFailed, bookingSuccess, failedComplex, loadComlpex, loadCourts, loadedComplex, loadedCourts } from "../actions/complex.action"
import { weather, weatherFailed, weatherSuccess } from "../actions/weather.action"

export const initRequestState : RequestState = 
{
    loading:true,
    error:false,
    message:'Init'
}

export const requestReducer = createReducer(
    initRequestState,
    on(weatherSuccess,weatherFailed,loadedCourts,bookingSuccess,bookingFailed,loginSuccessfully,loginFailed,loadedComplex,failedComplex,(state)=>{
        return {
            ...state,
            loading:false
        }
    }),

    on(weather,loadCourts,login,booking,loadComlpex,()=>{
        return {
            loading:true,
            error:false,
            message:""
        }
    }),

    on(weatherFailed,loginFailed,failedComplex,(state,{message})=>{
        return {
            ...state,
            message
        }
    }),

    on(isLogin,(state)=>{
        return{
            ...state,
            loading:true,
        }
    }),
)