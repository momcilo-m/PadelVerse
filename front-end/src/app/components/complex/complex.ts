import { Component, inject } from '@angular/core';
import { ComplexCard } from '../complex-card/complex-card';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { loadComlpex } from '../../store/actions/complex.action';
import { selectComplex } from '../../store/selectors/complex.selector';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-complex',
  imports: [ComplexCard,AsyncPipe],
  templateUrl: './complex.html',
  styleUrl: './complex.scss'
})
export class Complex {

  store = inject<Store<AppState>>(Store)

  complex$ = this.store.select(selectComplex)

  ngOnInit()
  {
    this.store.dispatch(loadComlpex());
  }
}
