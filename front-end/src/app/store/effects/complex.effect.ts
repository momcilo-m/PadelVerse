import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ComplexService } from "../../services/complex.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { failedComplex, failedCourts, loadComlpex, loadCourts, loadedComplex, loadedCourts } from "../actions/complex.action";

@Injectable()
export class ComplexEffect
{
    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)

    complex$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadComlpex),
            switchMap(()=>this.complexService.getComplex().pipe(
                map(res=>loadedComplex({complexes:res})),
                catchError(error=>of(failedComplex({message:error.message || "Error while fetch complex"})))
            ))
        )
    })

    $courts = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadCourts),
            switchMap((param)=>this.complexService.getAvailableCourt(param.complex,param.date,param.time, param.count).pipe(
                map((res)=>loadedCourts({courts:res.all, avalaible:res.available})),
                catchError(err=>of(failedCourts({message:err.message || "Fail when load courts"})))
            ))
        )
    })
}