import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { MessageInterface } from "../../models/message.interface";
import { createReducer, on } from "@ngrx/store";
import { addMessage, loadChat, loadChatSuccess } from "../actions/chat.action";

export interface ChatState extends EntityState<MessageInterface> {}

export const adapter = createEntityAdapter<MessageInterface>();

export const initialState: ChatState = adapter.getInitialState();

export const chatReducer = createReducer(
    initialState,

    on(loadChat, (state) => {
        return adapter.removeAll(state);
    }),

    on(loadChatSuccess,(state,{chats})=>{
        return adapter.addMany(chats,state);
    }),

    on(addMessage,(state,{message})=>{
        return adapter.addOne(message,state);
    })
)