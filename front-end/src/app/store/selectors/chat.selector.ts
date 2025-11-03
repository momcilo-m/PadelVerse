import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ComplexState } from "../reducers/complex.reducers";
import * as fromChat from './../reducers/chat.reducer';
import { selectUserId } from "./user.selector";
import { ChatState } from "../reducers/chat.reducer";

export const selectChatState = createFeatureSelector<ChatState>('chatStatus');
const { selectAll, selectEntities, selectIds, selectTotal } = fromChat.adapter.getSelectors();

export const selectChat = createSelector(
    selectChatState,
    selectAll
)