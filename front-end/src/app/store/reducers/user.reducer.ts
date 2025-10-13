import { createReducer, on } from "@ngrx/store";
import { isLogin, login, loginSuccessfully, updateProfileImageSuccessfully, updateProfileSuccessfully } from "../actions/user.action";
import { UserState } from "../states/user.state";

export const initUserState: UserState =
{
    user: null,
    complex: [],
    courts: []
}

export const userReducer = createReducer(
    initUserState,
    on(loginSuccessfully, (state, { user }) => {
        return {
            ...state,
            user,
        }
    }),
    on(login, (state) => {
        return {
            ...state,
            user: null,
        }
    }),
    // on(loginFailed, (state) => {
    //     return {
    //         ...state,
    //         user: null,
    //     }
    // }),
    on(isLogin, (state) => {
        return {
            ...state,
            user: null,
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