import { createReducer, on } from "@ngrx/store";
import { isLogin, login, loginFailed, loginSuccessfully, updateProfileImageSuccessfully, updateProfileSuccessfully } from "../actions/user.action";
import { UserState } from "../states/user.state";

export const initUserState: UserState =
{
    user: null
}

export const userReducer = createReducer(
    initUserState,
    on(loginSuccessfully, (_, { user }) => {
        return {
            user,
        }
    }),
    on(login, () => {
        return {
            user: null,
            // loading:true,
            // error:false,
            // message:""
        }
    }),
    on(loginFailed, () => {
        return {
            user: null,
        }
    }),
    on(isLogin, () => {
        return {
            // ...state,
            user: null,
            // loading:true,
            // error:false,
        }
    }),

    on(updateProfileSuccessfully, (state, payload) => {
        return {
            ...state,
            user: payload.user
        }
    }),

    on(updateProfileImageSuccessfully, (state, payload) => {
        return {
            ...state,
            user: state?.user ? { ...state.user, photo: payload.path } : state.user
        }
    })


)