import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.states';
import { selectUser } from '../store/selectors/user.selector';
import { filter, map } from 'rxjs';

export const login : CanActivateFn = (route, state) => {
  
  const store = inject<Store<AppState>>(Store)  
  const router = inject(Router)
  
  return store.select(selectUser).pipe(
    filter((user)=>user!==undefined),
    map(user=>{
      console.log(user);
      if(user) return true
      else 
      {
        return false;
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