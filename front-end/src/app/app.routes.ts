import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { login, notlogin } from './guards/login-guard';
import { Tournament } from './components/tournament/tournament';
import { SideNav } from './components/side-nav/side-nav';
import { Complexes } from './components/complexes/complexes';
import { Complex } from './components/complex/complex';
import { Maps } from './components/maps/maps';
import { Profile } from './components/profile/profile';
import { Management } from './components/management/management';
import { Register } from './components/register/register';
import { ConfirmRegistration } from './components/confirm-registration/confirm-registration';
import { Matches } from './components/matches/matches';
import { Match } from './components/match/match';

export const routes: Routes = [
  {
    path: '', component: SideNav, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'tours', component: Tournament, canActivate: [login] },
      { path: 'maps', component: Maps, canActivate: [login] },
      { path: 'complex', component: Complexes },
      { path: 'complex/:id', component: Complex },
      { path: 'matches', component: Matches },
      { path: 'match/:id', component: Match },
      { path: 'profile', component: Profile, canActivate: [login] },
      { path: 'management', component: Management, canActivate: [login] },
    ]
  },
  { path: 'login', component: Login, canActivate: [notlogin] },
  { path: 'register', component: Register, canActivate: [notlogin] },
  { path: 'confirmRegistration/:id', component: ConfirmRegistration, canActivate: [notlogin] },
];