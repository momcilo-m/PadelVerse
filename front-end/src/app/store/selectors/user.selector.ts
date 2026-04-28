import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../states/user.state';

export const selectUserState = createFeatureSelector<UserState>('userStatus');

export const selectUser = createSelector(
    selectUserState,
    (state) => state.user
);

export const selectUserId = createSelector(
    selectUser,
    (user) => user?.id ?? null
);

export const selectUserPhoto = createSelector(
    selectUser,
    (user) => user?.photo ?? null
);