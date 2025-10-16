import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ComplexService } from "../../services/complex.service";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { addComplex, addCourt, booking, bookingSuccess, createComplex, createCourt, editComplex, editComplexSuccess, failedComplex, loadComlpex, loadCourts, loadedComplex, loadedCourts, selectComplex, updateReview, uploadComplexImage, uploadComplexImageSuccess, userComplex, userComplexSuccess, vote } from "../actions/complex.action";
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { weather, weatherFailed } from "../actions/weather.action";
import { Store } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { selectComplexes, selectedComplex } from "../selectors/complex.selector";
import { BookingService } from "../../services/booking.service";
import { SimpleErrorHandler } from "../../handler/error.handler";
import { selectUser } from "../selectors/user.selector";


@Injectable()
export class ComplexEffect {
    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)
    private bookingService = inject(BookingService)
    private errorHandler = inject(SimpleErrorHandler)

    store = inject<Store<AppState>>(Store)


    constructor() {
    }

    selected$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(selectComplex),
            withLatestFrom(this.store.select(selectComplexes)),

            filter(([{ id }, complexes]) => complexes.length === 0 && complexes.find(el => el.id === id) === undefined),

            //Poziva se samo ako se u ne nalazi u listi
            switchMap(([{ id }, _]) => this.complexService.getComplexById(id).pipe(
                map((complex) => addComplex({ complex })),
                catchError(({ error }) => {
                    this.errorHandler.handleError(error)
                    return of(failedComplex({ message: error.message || "Failed while fetch complex" }))
                })
            ))
        )
    })

    votes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(selectComplex),
            withLatestFrom(this.store.select(selectComplexes)),

            filter(([{ id }, complexes]) => complexes.length === 0 && complexes.find(el => el.id === id && el.reviews != null) === undefined),

            switchMap(([{ id }, _]) => this.complexService.getReview(5, id).pipe(
                map(({ rating }) => updateReview({ rating, id })),
                catchError(({ error }) => {
                    this.errorHandler.handleError(error)
                    return of(failedComplex({ message: error.message || "Failed while fetch review for complex" }))
                })
            ))
        )
    })

    vote$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(vote),
            withLatestFrom(this.store.select(selectUser)),

            tap(([data, user]) => console.log(data, user)),

            filter(([_, user]) => user != null),



            switchMap(([{ complex, rating }, user]) => this.complexService.vote(user!.id, rating, complex).pipe(
                map(({ complex, rating }) => updateReview({ rating, id: complex })),
                catchError(({ error }) => {
                    this.errorHandler.handleError(error)
                    return of(failedComplex({ message: error.message || "Failed while vote" }))
                })
            ))
        )
    })

    complex$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadComlpex),
            switchMap(({ query }) => this.complexService.getComplex(query).pipe(
                map(([complexes, count]) => loadedComplex({ complexes, count })),
                catchError(({ error }) => of(failedComplex({ message: error.message || "Error while fetch complex" })))
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
                            //weather({ date: param.date, hour: param.time })
                        ]
                        )),
                    catchError(({ error }) =>
                        of(
                            failedComplex({ message: error.message || "Fail when load courts" })
                        ),
                    )
                ))
        )
    })

    $booking = createEffect(() => {
        return this.actions$.pipe(
            ofType(booking),
            switchMap((param) => this.bookingService.checkout_session(param.complex, param.court, param.count).pipe(
                map(res => bookingSuccess({ id: res.id })),
                catchError(({ error }) => of(
                    failedComplex({ message: error.message || "Fail with checkout" })
                ))
            ))
        )
    })

    $bookingSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(bookingSuccess),
            tap(({ id }) => this.bookingService.checkout(id.toString())),
            catchError(({ error }) => of(
                failedComplex({ message: error.message || "Problem" })
            ))
        )
    }, { dispatch: false })

    $myCourts = createEffect(() => {
        return this.actions$.pipe(
            ofType(userComplex),
            switchMap((owner) => this.complexService.getComplexByOwner(owner.id).pipe(
                map(complex => userComplexSuccess({ complex })),
                catchError(({ error }) => of(
                    //userComplexFailed({ message: error.message || "Failed when load message" })
                    failedComplex({ message: error.message || "Fail with checkout" })
                ))
            ))
        )
    })

    createComplex$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createComplex),
            switchMap(({ complex }) => this.complexService.createComplex(complex).pipe(
                map(complex => addComplex({ complex })),
                catchError(({ error }) => of(failedComplex({ message: error.message || "Failed when create complex" })))
            ))
        )
    })

    createCourt$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCourt),
            switchMap(({ court }) => this.complexService.createCourt(court).pipe(
                map(court => addCourt({ court })),
                catchError(({ error }) => of(
                    //failedCourts({ message: error.message || "Failed when create courts" })
                    failedComplex({ message: error.message || "Failed when create courts" })
                ))
            ))
        )
    })

    editComplex$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(editComplex),
            switchMap(({ complex, id }) => this.complexService.editComplex(complex, id).pipe(
                tap((complex) => console.log("EDIT: ", complex)),
                map((complex) => editComplexSuccess({ complex, id })),
                catchError(({ error }) => of(failedComplex({ message: error.message || "Failed when edit complex" })))
            ))
        )
    })

    uploadComplexImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(uploadComplexImage),
            switchMap(({ file, id }) => this.complexService.uploadComplexImage(file, id).pipe(
                tap((img) => console.log(img.path)),
                map(({ path }) => uploadComplexImageSuccess({ path, id })),
                catchError(({ error }) => of(failedComplex({ message: error.message || "Error while upload image" })))
            ))
        )
    })
}