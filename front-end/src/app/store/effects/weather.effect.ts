import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { weather, weatherFailed, weatherSuccess } from "../actions/weather.action";
import { catchError, combineLatest, filter, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { ComplexService } from "../../services/complex.service";
import { Store } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { selectedComplex, selectedLocation } from "../selectors/complex.selector";

@Injectable()

export class WeatherEffect {

    private actions$ = inject(Actions)
    private complexService = inject(ComplexService)

    store = inject<Store<AppState>>(Store)


    weather$ = createEffect(() =>
        this.actions$.pipe(
            ofType(weather),
            withLatestFrom(this.store.select(selectedComplex)),
            filter(([_, complex]) => complex?.location !== undefined),
            filter(([_, complex]) => complex?.location.x !== undefined && complex?.location.y !== undefined),
            
            switchMap(([action, complex]) => this.complexService.getWeather(action.date, action.hour, complex!.location.x.toString() + "," + complex!.location.y.toString()).pipe(
                map(data => weatherSuccess({ data: data, hour: +action.hour.split(":")[0] })),
                catchError(({ err }) => of(weatherFailed({ message: err.message || 'Greska' })))
            ))
        )
    );
}



// this.store.select(selectedLocation).pipe(
//     filter(loc => !!loc),
//     take(1),
//     tap((loc) => console.log(loc)),
//     switchMap(() =>
//        
//     )
// )