import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.states';
import { selectLoading, selectUser } from '../store/selectors/user.selector';
import { filter, map, Observable, switchMap, take } from 'rxjs';

export const login : CanActivateFn = (route, state) => {
  
  const store = inject<Store<AppState>>(Store)  
  const router = inject(Router)
  
  return store.select(selectLoading).pipe(
    switchMap(state => {
      if(state)
      {
        return store.select(selectUser).pipe(
          filter(user => user !== null), 
          map(user =>{
              if(user) return true;
              router.navigate(["/login"])
              return false
            }
          ),
        )
      }
      else
      {
        return store.select(selectUser).pipe(
          map(user=>{
            if(user)return true;
            router.navigate(["/login"])
            return false;
          }),
          take(1)

        )
      }
    })
  )
};


export const notlogin : CanActivateFn = (route, state) => {
  
  const store = inject<Store<AppState>>(Store)  
  const router = inject(Router)
  
  return store.select(selectUser).pipe(
    filter((user)=>user!==undefined),
    map(user=>{
      console.log(user);
      if(!user) return true
      else 
      {
        router.navigate(['/home'])
        return false;
      }
    })
  )
};