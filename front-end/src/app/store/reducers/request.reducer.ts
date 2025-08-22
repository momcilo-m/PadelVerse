import { createReducer, on } from "@ngrx/store"
import { RequestState } from "../states/request.state"
import { isLogin, login, loginFailed, loginSuccessfully } from "../actions/user.action"
import { failedComplex, loadComlpex, loadedComplex } from "../actions/complex.action"

export const initRequestState : RequestState = 
{
    loading:true,
    error:false,
    message:'Init'
}

export const requestReducer = createReducer(
    initRequestState,
    on(loginSuccessfully,loginFailed,loadedComplex,failedComplex,(state)=>{
        return {
            ...state,
            loading:false
        }
    }),

    on(login,loadComlpex,()=>{
        return {
            loading:true,
            error:false,
            message:""
        }
    }),

    on(loginFailed,failedComplex,(state,{message})=>{
        return {
            ...state,
            message
        }
    }),

    // on(loginSuccessfully,loadedComplex,(state,{c})=>{
    //     return {
    //         ...state,
    //     }
    // }),

    on(isLogin,(state)=>{
        return{
            ...state,
            loading:true,
            // error:false,
        }
    })
)