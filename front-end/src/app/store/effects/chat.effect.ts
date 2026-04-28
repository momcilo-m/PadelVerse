import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ChatService } from "../../services/chat.service"
import { SimpleErrorHandler } from "../../handler/error.handler"
import { NotificationService } from "../../services/notification.service"
import { Store } from "@ngrx/store"
import { loadChat, loadChatError, loadChatSuccess, sendMessage } from "../actions/chat.action"
import { catchError, map, of, switchMap, tap } from "rxjs"

@Injectable()
export class ChatEffect {
    private actions$ = inject(Actions)
    private chatService = inject(ChatService)
    private errorHandler = inject(SimpleErrorHandler)
    private notify = inject(NotificationService)

    store = inject<Store>(Store)


    constructor() {
    }

    messages$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadChat),
            switchMap(({id})=>this.chatService.getChat(id).pipe(
                map(chats=>loadChatSuccess({chats})),
                catchError(({error})=>of(loadChatError({message:error.message || "Error while get chats"})))                
            ))
        )
    })   

    sendMessage$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(sendMessage),
            tap(()=>console.log("salje se poruka")),
            switchMap(({message,id})=>this.chatService.sendMessage(message,id))
        )
    },{dispatch:false})
}