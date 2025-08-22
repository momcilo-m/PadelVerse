import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ComplexService } from "../../services/complex.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { failedComplex, loadComlpex, loadedComplex } from "../actions/complex.action";

@Injectable()
export class ComplexEffect
{
    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)

    complex$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadComlpex),
            switchMap(()=>this.complexService.getComplex().pipe(
                tap(()=>console.log("AAA")),
                map(res=>loadedComplex({complexes:res})),
                catchError(error=>of(failedComplex({message:error.message || "Error while fetch complex"})))
            ))
        )
    })
}