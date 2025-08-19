import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { UserService } from "../../services/user.service";
import { login, loginFailed, loginSuccessfully } from "../actions/user.action";
import { catchError, EMPTY, exhaustMap, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class UserEffect
{
    private actions$ = inject(Actions)
    private userService = inject(UserService)

    login$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(login),
            switchMap((action)=>this.userService.login(action.email,action.password).pipe(
                      tap(() => console.log('Pozivam servis')),

                map(user=>loginSuccessfully({user})),
                catchError(error => of(loginFailed({ message:error.message || "Fail" })))
            ))   
        );
    });
}