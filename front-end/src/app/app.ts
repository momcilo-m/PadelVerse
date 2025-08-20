import { Component, inject, signal } from '@angular/core';
import { Login } from './components/login/login';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.states';
import { isLogin } from './store/actions/user.action';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { selectLoading, selectUser } from './store/selectors/user.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone:true
})
export class App {
  // protected readonly title = signal('front-end');
  
  user$: Observable<User | null> | undefined
  isLoading$: Observable<boolean> | undefined

  private store = inject<Store<AppState>>(Store);
  private router = inject(Router)

  ngOnInit()
  {
    this.user$ = this.store.select(selectUser)
    this.isLoading$ = this.store.select(selectLoading)

    this.store.dispatch(isLogin())

    this.isLoading$.subscribe(isLoading=>
    {
      if(!isLoading)
      {
        this.user$?.subscribe(user=>{
          if(user)
            this.router.navigate(['/home'])
          else
            this.router.navigate(['/login'])
        })
      }
    })
  }

}
