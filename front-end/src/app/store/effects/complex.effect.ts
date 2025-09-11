import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ComplexService } from "../../services/complex.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { booking, bookingFailed, bookingSuccess, failedComplex, failedCourts, loadComlpex, loadCourts, loadedComplex, loadedCourts } from "../actions/complex.action";
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable()
export class ComplexEffect
{
    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)

    constructor()
    {
    }

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

    $booking = createEffect(()=>{
        return this.actions$.pipe(
            ofType(booking),
            switchMap((param)=> this.complexService.checkout(param.complex,param.court,param.count).pipe(
                map(res=>bookingSuccess({id:res.id})),
                catchError(err=>of(bookingFailed({message:err.message || "Fail with checkout"})))
            ))
        )
    })

    $bookingSuccess = createEffect(()=>{
        return this.actions$.pipe(
            ofType(bookingSuccess),
            tap(async ({id})=>{
                const stripe = await loadStripe("pk_test_51S6EVACq02uHmIrC98mVnThKAvZT6PJ3zGpZuhow7AVExgJSuzPAWkp2MfCXGC1VnldB4BloLuKWZh9l9d8LnR6I00UC8jbVRS");
                stripe?.redirectToCheckout({sessionId:id})
            })
        )
    },{dispatch:false})
}