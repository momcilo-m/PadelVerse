import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user.interface";
import { login, loginFailed, loginSuccessfully } from "../actions/user.action";


export interface userState
{
    user:User | null;
    loading:boolean,
    error:boolean,
    message:string
} 


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
    })


)