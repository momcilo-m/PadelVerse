import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects"
import { UserService } from "../../services/user.service";
import { isLogin, login, loginFailed, loginSuccessfully, updateProfile, updateProfileFailed, updateProfileImage, updateProfileImageFailed, updateProfileImageSuccessfully, updateProfileSuccessfully } from "../actions/user.action";
import { catchError, EMPTY, exhaustMap, filter, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class UserEffect {
    private actions$ = inject(Actions)
    private userService = inject(UserService)

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(login),
            switchMap((action) => this.userService.login(action.email, action.password).pipe(
                map(user => loginSuccessfully({ user })),
                catchError(error => of(loginFailed({ message: error.message || "Fail" })))
            ))
        );
    });

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => this.userService.isLogin().pipe(
                map(user => loginSuccessfully({ user })),
                catchError(error => of(loginFailed({ message: error.message || "Fail" })))
            ))
        )
    })

    updateProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProfile),
            switchMap((action) => this.userService.updateProfile(action.email, action.phone, action.first_name, action.last_name).pipe(
                map(user => updateProfileSuccessfully({ user })),
                catchError(error => of(updateProfileFailed({ message: error.message || "Fail" })))
            ))
        )
    })

    updateProfileImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProfileImage),
            switchMap((action) => this.userService.updateProfileImage(action.file).pipe(
                tap((img) => console.log(img.path)),
                map(({ path }) => updateProfileImageSuccessfully({ path })),
                catchError(error => of(updateProfileImageFailed({ message: error.message || "Fail" })))
            ))
        )
    })
}