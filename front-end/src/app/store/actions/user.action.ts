import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.interface";

export const login = createAction("login", props<{ email: string, password: string }>())
export const isLogin = createAction('isLogin');
export const loginSuccessfully = createAction("loginSuccessfully", props<{ user: User }>())

export const updateProfile = createAction("updateProfile", props<{ email?: string, phone?: string, first_name?: string, last_name?: string }>())
export const updateProfileSuccessfully = createAction("updateProfileSuccessfully", props<{ user: User }>())

export const updateProfileImage = createAction("updateProfileImage", props<{ file: File }>())
export const updateProfileImageSuccessfully = createAction("updateProfileImageSuccessfully", props<{ path: string }>())

export const register = createAction("register", props<{ user: UserRegisterInterface }>())
export const registerSuccess = createAction('registerSuccess')//props<{}>

export const activateUser = createAction("activateUser", props<{ token: string }>())
export const activateUserSuccess = createAction("activateUserSuccess");
export const activateUserFail = createAction("activateUserFail", props<{ message: string }>())

export const userFailed = createAction("userFailed", props<{ message: string }>())