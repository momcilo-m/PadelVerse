import { createReducer, on } from "@ngrx/store";
import { isLogin, login, loginFailed, loginSuccessfully } from "../actions/user.action"; 
import { userState } from "../states/app.states";

export const initState : userState = 
{
    user:null,
    loading:false,
    error:false,
    message:""
}

export const userReducer = createReducer(
    initState,
    on(loginSuccessfully,(_,{user})=>{
        console.log(user)
        return {
            user,
            loading:false,
            error:false,
            message:'Successfully logged in'
        }
    }),
    on(login,()=>{
        return {
            user:null,
            loading:true,
            error:false,
            message:""
        }
    }),
    on(loginFailed,(_,{message})=>{
        return {
            user:null,
            loading:false,
            message,
            error:true
        }
    }),
    on(isLogin,(state)=>{
        return{
            ...state,
            usre:null,
            loading:true,
            error:false,
        }
    })


)