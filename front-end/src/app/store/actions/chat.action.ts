import { createAction, props } from "@ngrx/store";
import { MessageInterface } from "../../models/message.interface";

export const loadChat = createAction("loadChat",props<{id:number}>());
export const loadChatSuccess = createAction("loadChatSuccess",props<{chats:MessageInterface[]}>());
export const loadChatError = createAction("loadChatError",props<{message:string}>());

export const sendMessage = createAction("sendMessage",props<{message:string, id:number}>())
export const addMessage = createAction("addMessage",props<{message:MessageInterface}>())