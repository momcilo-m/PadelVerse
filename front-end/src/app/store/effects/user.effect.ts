import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects"
import { UserService } from "../../services/user.service";
import { isLogin, login, loginFailed, loginSuccessfully } from "../actions/user.action";
import { catchError, EMPTY, exhaustMap, filter, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class UserEffect
{
    private actions$ = inject(Actions)
    private userService = inject(UserService)

    login$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(login),
            switchMap((action)=>this.userService.login(action.email,action.password).pipe(
                map(user=>loginSuccessfully({user})),
                catchError(error => of(loginFailed({ message:error.message || "Fail" })))
            ))   
        );
    });

    init$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(()=>this.userService.isLogin().pipe(
                map(user=>loginSuccessfully({user})),
                catchError(error=>of(loginFailed({message:error.message || "Fail"})))
            ))
        )
    })
}