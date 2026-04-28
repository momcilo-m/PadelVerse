import { createReducer, on } from "@ngrx/store"
import { RequestState } from "../states/request.state"
import { activateUser, activateUserFail, activateUserSuccess, isLogin, login, loginSuccessfully, logout, logoutReq, register, updateProfile, updateProfileImage, updateProfileImageSuccessfully, updateProfileSuccessfully, userFailed } from "../actions/user.action"
import { addComplex, addCourt, booking, bookingSuccess, createComplex, createCourt, editComplex, failedComplex, getVote, loadComlpex, loadCourts, loadedComplex, loadedCourts, updateReview, uploadComplexImage, uploadComplexImageSuccess, userComplex, userComplexSuccess, vote } from "../actions/complex.action"
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
        updateProfileSuccessfully,
        weatherSuccess, weatherFailed,
        loadedCourts,
        bookingSuccess,
        loginSuccessfully, logout,
        loadedComplex, failedComplex,
        updateProfileImageSuccessfully,
        userFailed,
        addComplex, addCourt,
        uploadComplexImageSuccess,
        register, userFailed,
        activateUserSuccess, activateUserFail,
        updateReview,
        (state) => {
            return {
                ...state,
                loading: false
            }
        }),

    on(getVote,logoutReq,vote, activateUser, uploadComplexImage, editComplex, createCourt, createComplex, userComplex, updateProfileImage, updateProfile, weather, loadCourts, login, booking, loadComlpex, () => {
        return {
            loading: true,
            error: false,
            message: ""
        }
    }),

    on(
        activateUserFail, userFailed, weatherFailed, userFailed, failedComplex, (state, { message }) => {
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