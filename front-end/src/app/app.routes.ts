import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { login } from './guards/login-guard';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'login', component: Login },
  { path: 'home', component:Home}
];