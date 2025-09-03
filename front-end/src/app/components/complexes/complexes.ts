import { Component, inject } from '@angular/core';
import { ComplexCard } from '../complex-card/complex-card';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { loadComlpex, selectComplex } from '../../store/actions/complex.action';
import { selectComplexes } from '../../store/selectors/complex.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complex',
  imports: [ComplexCard,AsyncPipe],
  templateUrl: './complexes.html',
  styleUrl: './complexes.scss'
})
export class Complexes {

  store = inject<Store<AppState>>(Store)
  router = inject(Router)

  complex$ = this.store.select(selectComplexes)

  pickComplex(id:number)
  {
    this.store.dispatch(selectComplex({id}))
    this.router.navigate([`/complex/${id}`])
  }

  ngOnInit()
  {
    this.store.dispatch(loadComlpex());
  }
}
