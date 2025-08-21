import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { login } from './guards/login-guard';
import { Tournament } from './components/tournament/tournament';
import { SideNav } from './components/side-nav/side-nav';

export const routes: Routes = [
  { path: '', component: SideNav, children:[
    { path: 'home', component:Home, canActivate:[login]},
    { path: 'tours', component:Tournament, canActivate:[login]}
  ] },
  { path: 'login', component: Login},
];