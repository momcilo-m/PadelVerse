import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { selectUser } from '../store/selectors/user.selector';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { selectLoading } from '../store/selectors/request.selector';

export const login: CanActivateFn = () => {

  const store = inject<Store<AppState>>(Store)
  const router = inject(Router)

  return store.select(selectLoading).pipe(
    filter(state => state == false),
    switchMap(() => store.select(selectUser).pipe(
      map(user => {
        if (user) return true;
        router.navigate(['/login']);
        return false;
      })
    )))
};

export const notlogin: CanActivateFn = () => {

  const store = inject<Store<AppState>>(Store)
  const router = inject(Router)

  return store.select(selectLoading).pipe(
    filter(state => state == false),
    switchMap(() => store.select(selectUser).pipe(
      tap((user) => console.log(user)),
      map(user => {
        if (!user) return true;
        router.navigate(['/profile']);
        return false;
      })
    )))
};