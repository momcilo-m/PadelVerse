import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { ComplexCard } from '../complex-card/complex-card';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { loadComlpex, selectComplex } from '../../store/actions/complex.action';
import { complexCount, selectComplexes } from '../../store/selectors/complex.selector';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-complex',
  standalone: true,
  imports: [ComplexCard, AsyncPipe, MatPaginatorModule,
    MatSliderModule, MatSliderModule, MatExpansionModule, MatCheckboxModule, MatInputModule,
    MatTimepickerModule, MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './complexes.html',
  styleUrl: './complexes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Complexes {

  store = inject<Store<AppState>>(Store)
  router = inject(Router)

  private page = 1;
  private limit = 2;

  rangeStart = 0;
  rangeEnd = 1;

  complex$ = this.store.select(selectComplexes)
  count$ = this.store.select(complexCount)


  formFilter = new FormGroup({
    date: new FormControl<Date>(new Date()),
    startTime: new FormControl<Date>(new Date()),
    endTime: new FormControl<Date>(new Date()),
    count: new FormControl<number>(1),
    court: new FormControl<number>(-1),
  });


  pickComplex(id: number) {
    this.store.dispatch(selectComplex({ id }))
    this.router.navigate([`/complex/${id}`])
  }

  ngOnInit() {
    this.store.dispatch(loadComlpex({ query: `page=${this.page}&limit=${this.limit}` }));
  }

  changePage(event: PageEvent) {
    const { pageSize, pageIndex } = event;
    this.limit = pageSize;
    this.page = pageIndex + 1;

    this.store.dispatch(loadComlpex({ query: `page=${this.page}&limit=${this.limit}` }))
  }
}
