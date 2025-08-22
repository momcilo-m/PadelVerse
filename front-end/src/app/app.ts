import { Component, inject, signal } from '@angular/core';
import { Login } from './components/login/login';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';
import { isLogin } from './store/actions/user.action';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { selectUser } from './store/selectors/user.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone:true
})
export class App {
  protected readonly title = signal('front-end');
}
