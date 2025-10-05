import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ComplexService } from "../../services/complex.service";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { addComplex, addCourt, booking, bookingFailed, bookingSuccess, createComplex, createCourt, failedComplex, failedCourts, loadComlpex, loadCourts, loadedComplex, loadedCourts, selectComplex, userComplex, userComplexFailed, userComplexSuccessfully } from "../actions/complex.action";
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { weather, weatherFailed } from "../actions/weather.action";
import { Store } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { selectedLocation } from "../selectors/complex.selector";

@Injectable()
export class ComplexEffect {
    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)

    store = inject<Store<AppState>>(Store)


    constructor() {
    }

    selected$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(selectComplex),
            withLatestFrom(this.store.select(selectedLocation)),
            filter(([id, location]) => !location),
            switchMap(([{ id }, location]) => this.complexService.getComplexById(id).pipe(
                //map((res)=>loadedComplex({complexes:[res]})),
                map((complex) => addComplex({ complex })),
                catchError((err) => of(failedComplex({ message: err.message || "Failed while fetch complex" })))
            ))
        )
    })

    complex$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadComlpex),
            switchMap(() => this.complexService.getComplex().pipe(
                map(res => loadedComplex({ complexes: res })),
                catchError(error => of(failedComplex({ message: error.message || "Error while fetch complex" })))
            ))
        )
    })

    $courts = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadCourts),
            switchMap((param) =>
                this.complexService.getAvailableCourt(param.complex, param.date, param.time, param.count).pipe(
                    switchMap((res) =>
                        from([
                            loadedCourts({ courts: res.all, avalaible: res.available }),
                            //weather({date:param.date,hour:param.time})
                        ]
                        )),
                    catchError(err =>
                        of(
                            failedCourts({ message: err.message || "Fail when load courts" }),
                        ),
                    )
                ))
        )
    })

    $booking = createEffect(() => {
        return this.actions$.pipe(
            ofType(booking),
            switchMap((param) => this.complexService.checkout(param.complex, param.court, param.count).pipe(
                map(res => bookingSuccess({ id: res.id })),
                catchError(err => of(bookingFailed({ message: err.message || "Fail with checkout" })))
            ))
        )
    })

    $bookingSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(bookingSuccess),
            tap(async ({ id }) => {
                const stripe = await loadStripe("pk_test_51S6EVACq02uHmIrC98mVnThKAvZT6PJ3zGpZuhow7AVExgJSuzPAWkp2MfCXGC1VnldB4BloLuKWZh9l9d8LnR6I00UC8jbVRS");
                stripe?.redirectToCheckout({ sessionId: id })
            })
        )
    }, { dispatch: false })

    $myCourts = createEffect(() => {
        return this.actions$.pipe(
            ofType(userComplex),
            switchMap((owner) => this.complexService.getComplexByOwner(owner.id).pipe(
                map(complex => userComplexSuccessfully({ complex })),
                catchError((err) => of(userComplexFailed({ message: err.message || "Failed when load message" })))
            ))
        )
    })

    createComplex$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createComplex),
            switchMap(({ complex }) => this.complexService.createComplex(complex).pipe(
                map(complex => addComplex({ complex })),
                catchError((err) => of(failedComplex({ message: err.message || "Failed when create complex" })))
            ))
        )
    })

    createCourt$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCourt),
            switchMap(({ court }) => this.complexService.createCourt(court).pipe(
                map(court => addCourt({ court })),
                catchError((err) => of(failedCourts({ message: err.message || "Failed when create courts" })))
            ))
        )
    })
}