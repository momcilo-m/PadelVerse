import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { weather, weatherFailed, weatherSuccess } from "../actions/weather.action";
import { catchError, filter, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { ComplexService } from "../../services/complex.service";
import { Store } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { selectedLocation } from "../selectors/complex.selector";

@Injectable()

export class WeatherEffect
{

    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)

    store = inject<Store<AppState>>(Store)


    weather$ = createEffect(() =>
        this.actions$.pipe(
            ofType(weather),
            switchMap(action =>
                this.store.select(selectedLocation).pipe(
                    filter(loc => !!loc),
                    take(1),
                    tap((loc)=>console.log(loc)),
                    switchMap(location =>
                    this.complexService.getWeather(
                        action.date,
                        action.hour,
                        //`[${location.x},${location.y}]`
                        "Belgrade"
                    ).pipe(
                        map(data => weatherSuccess({ data })),
                        catchError(err => of(weatherFailed({ message: err.message || 'Greska' })))
                    )
                    )
                )
            )
        )
        );


}