import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { activateUser } from '../../store/actions/user.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectError, selectLoading } from '../../store/selectors/request.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-confirm-registration',
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './confirm-registration.html',
  styleUrl: './confirm-registration.scss'
})
export class ConfirmRegistration {

  constructor(private route: ActivatedRoute) { }

  store = inject<Store<AppState>>(Store)

  loading$ = this.store.select(selectLoading)
  error$ = this.store.select(selectError)

  ngAfterViewInit() {
    let token = this.route.snapshot.paramMap.get('id') || "";
    this.store.dispatch(activateUser({ token }))
  }

}
