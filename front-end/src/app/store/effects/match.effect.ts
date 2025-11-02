import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MatchesService } from "../../services/matches.service"
import { SimpleErrorHandler } from "../../handler/error.handler"
import { NotificationService } from "../../services/notification.service"
import { Store } from "@ngrx/store"
import { AppState } from "../states/app.state"
import { liveMatch, liveMatchSuccess, matchAndLiveSuccess, matchFail, matchStats, matchStatsSuccess, selectMatch } from "../actions/match.action"
import { catchError, iif, map, merge, Observable, of, switchMap, tap, withLatestFrom } from "rxjs"
import { SocketService } from "../../services/socket.service"
import { selectedMatch } from "../selectors/match.selector"
import { addEvent, eventFail, evetnsSuccess, loadEvetns } from "../actions/events.action"


export class MatchEffect {


    private actions$ = inject(Actions)
    private matchService = inject(MatchesService)
    private socketService = inject(SocketService)
    private errorHandler = inject(SimpleErrorHandler)
    private notify = inject(NotificationService)

    store = inject<Store<AppState>>(Store)


    constructor() {
    }


    matches$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(liveMatch),
            switchMap(() => this.matchService.getLiveMatches().pipe(
                map((matches) => liveMatchSuccess({ matches })),
                catchError(({ error }) => of(matchFail({ message: error.message })))
            ))
        )
    })

    // stats$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(matchStats),
    //         switchMap(({ id }) => this.matchService.getStats(id).pipe(
    //             map((stats) => matchStatsSuccess({ stats })),
    //             catchError(({ error }) => of(matchFail({ message: error.message })))
    //         ))
    //     )
    // })

    // match$ = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(selectMatch),
    //         switchMap(({id})=>this.matchService.getMatchById(id))
    //     )
    // })

    match$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(selectMatch),
            withLatestFrom(this.store.select(selectedMatch)),
            switchMap(([{ id }, selected]) =>
                iif(
                    () => !selected,
                    this.matchService.getMatchById(id).pipe(
                        map(({ match, stats }) => matchAndLiveSuccess({ match, stats })),
                        catchError(({ error }) => of(matchFail({ message: error.message })))
                    ),
                    this.matchService.getStats(id).pipe(
                        map(stats => matchStatsSuccess({ stats })),
                        catchError(({ error }) => of(matchFail({ message: error.message })))
                    )
                )
            )
        );
    });

    events$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadEvetns),
            switchMap(({ id }) => this.matchService.getEvents(id).pipe(
                map((events) => evetnsSuccess({ events })),
                catchError(({ error }) => of(eventFail({ message: error.message })))
            ))
        )
    })
}
