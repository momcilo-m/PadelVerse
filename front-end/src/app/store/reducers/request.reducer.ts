import { createReducer, on } from "@ngrx/store"
import { RequestState } from "../states/request.state"
import { isLogin, login, loginFailed, loginSuccessfully, updateProfile, updateProfileFailed, updateProfileImage, updateProfileImageFailed, updateProfileImageSuccessfully, updateProfileSuccessfully } from "../actions/user.action"
import { addComplex, addCourt, booking, bookingSuccess, createComplex, createCourt, editComplex, failedComplex, loadComlpex, loadCourts, loadedComplex, loadedCourts, uploadComplexImage, uploadComplexImageSuccess, userComplex, userComplexSuccess } from "../actions/complex.action"
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
        userComplexSuccess,
        updateProfileSuccessfully, updateProfileFailed,
        weatherSuccess, weatherFailed,
        loadedCourts,
        bookingSuccess,
        loginSuccessfully, loginFailed,
        loadedComplex, failedComplex,
        updateProfileImageSuccessfully, updateProfileImageFailed,
        addComplex, addCourt,
        uploadComplexImageSuccess,
        (state) => {
            return {
                ...state,
                loading: false
            }
        }),

    on(uploadComplexImage, editComplex, createCourt, createComplex, userComplex, updateProfileImage, updateProfile, weather, loadCourts, login, booking, loadComlpex, () => {
        return {
            loading: true,
            error: false,
            message: ""
        }
    }),

    on(
        updateProfileImageFailed, updateProfileFailed, weatherFailed, loginFailed, failedComplex, (state, { message }) => {
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