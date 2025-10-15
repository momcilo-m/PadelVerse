import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects"
import { UserService } from "../../services/user.service";
import { activateUser, activateUserFail, activateUserSuccess, isLogin, login, loginSuccessfully, logout, register, registerSuccess, updateProfile, updateProfileImage, updateProfileImageSuccessfully, updateProfileSuccessfully, userFailed } from "../actions/user.action";
import { catchError, delay, EMPTY, exhaustMap, filter, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import { SimpleErrorHandler } from "../../handler/error.handler";

@Injectable()
export class UserEffect {
    private actions$ = inject(Actions)
    private userService = inject(UserService)
    private router = inject(Router)
    private notify = inject(NotificationService)
    private errorHandler = inject(SimpleErrorHandler)

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(login),
            switchMap((action) => this.userService.login(action.email, action.password).pipe(
                map(user => loginSuccessfully({ user })),
                catchError(error => of(userFailed({ message: error.message || "Fail" })))
            )),
            tap(() => this.router.navigate(['/profile']))
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            tap(() => {
                this.router.navigate(['/home']);
                this.notify.error("Please login")
            }),
        )
    },
        { dispatch: false }
    )

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => this.userService.isLogin().pipe(
                map(user => loginSuccessfully({ user })),
                catchError(({ error }) => {
                    this.errorHandler.handleError(error)
                    return of(userFailed({ message: error.message || "Fail" }))
                })
            )),
        )
    })

    updateProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProfile),
            switchMap((action) => this.userService.updateProfile(action.email, action.phone, action.first_name, action.last_name).pipe(
                map(user => updateProfileSuccessfully({ user })),
                catchError(({ error }) => of(userFailed({ message: error.message || "Fail" })))
            ))
        )
    })

    updateProfileImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProfileImage),
            switchMap((action) => this.userService.updateProfileImage(action.file).pipe(
                tap((img) => console.log(img.path)),
                map(({ path }) => updateProfileImageSuccessfully({ path })),
                catchError(({ error }) => of(userFailed({ message: error.message || "Fail" })))
            ))
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(register),
            switchMap(({ user }) => this.userService.register(user).pipe(
                map(() => registerSuccess()),
                catchError(({ error }) => of(userFailed({ message: error.error.message.join(", ") || "Fail while register" })))
            ))
        )
    })

    registerSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerSuccess),
            tap(() => {
                this.router.navigate(['/login']);
            }),
        )
    },
        { dispatch: false }
    )

    // loginSuccess$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(loginSuccessfully),
    //         tap(() => {
    //             this.router.navigate(['/profile']);
    //         }),
    //     )
    // },
    //     { dispatch: false }
    // )

    activateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(activateUser),
            switchMap(({ token }) =>
                this.userService.confirmRegistration(token).pipe(
                    map(() => activateUserSuccess()),
                    catchError(({ error }) =>
                        of(activateUserFail({ message: error.message || "Failed while activating user" }))
                    )
                )
            )
        );
    });


    redirectAfterActivate$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(activateUserSuccess, activateUserFail),
                delay(3000),
                tap(() => this.router.navigate(['/login']))
            );
        },
        { dispatch: false }
    );
}