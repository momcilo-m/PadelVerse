import { createReducer, on } from "@ngrx/store"
import { RequestState } from "../states/request.state"
import { isLogin, login, loginFailed, loginSuccessfully, updateProfile, updateProfileFailed, updateProfileImage, updateProfileImageFailed, updateProfileImageSuccessfully, updateProfileSuccessfully } from "../actions/user.action"
import { booking, bookingFailed, bookingSuccess, failedComplex, loadComlpex, loadCourts, loadedComplex, loadedCourts } from "../actions/complex.action"
import { weather, weatherFailed, weatherSuccess } from "../actions/weather.action"

export const initRequestState: RequestState =
{
    loading: true,
    error: false,
    message: 'Init'
}

export const requestReducer = createReducer(
    initRequestState,
    on(
        updateProfileSuccessfully, updateProfileFailed,
        weatherSuccess, weatherFailed,
        loadedCourts,
        bookingSuccess, bookingFailed,
        loginSuccessfully, loginFailed,
        loadedComplex, failedComplex,
        updateProfileImageSuccessfully, updateProfileImageFailed,
        (state) => {
            return {
                ...state,
                loading: false
            }
        }),

    on(updateProfileImage, updateProfile, weather, loadCourts, login, booking, loadComlpex, () => {
        return {
            loading: true,
            error: false,
            message: ""
        }
    }),

    on(updateProfileImageFailed, updateProfileFailed, weatherFailed, loginFailed, failedComplex, (state, { message }) => {
        return {
            ...state,
            message
        }
    }),

    on(isLogin, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
)