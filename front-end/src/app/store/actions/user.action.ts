import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.interface";

export const login = createAction("login",props<{email:string,password:string}>())
export const isLogin = createAction('isLogin');
export const loginSuccessfully= createAction("loginSuccessfully",props<{user:User}>())
export const loginFailed = createAction("loginFailed",props<{message:string}>())

export const updateProfile = createAction("updateProfile",props<{email:string, phone:string, first_name:string, last_name:string}>())
export const updateProfileSuccess = createAction("updateProfileSuccess")