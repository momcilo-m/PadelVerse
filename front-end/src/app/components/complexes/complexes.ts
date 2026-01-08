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
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-complex',
  standalone: true,
  imports: [ComplexCard, AsyncPipe, MatPaginatorModule,
    MatSliderModule, MatSliderModule, MatExpansionModule, MatCheckboxModule, MatInputModule,
    MatTimepickerModule, MatSelectModule, MatRadioModule,
    ReactiveFormsModule, MatIconModule, MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './complexes.html',
  styleUrl: './complexes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Complexes {

  store = inject<Store<AppState>>(Store)
  router = inject(Router)

  pageSize = 2; 

  private page = 1;
  private limit = 2;

  rangeStart = 0;
  rangeEnd = 1;

  complex$ = this.store.select(selectComplexes)
  count$ = this.store.select(complexCount)


  formFilter = new FormGroup({
    priceMin: new FormControl(0),
    priceMax: new FormControl(100),
    open_time: new FormControl<Date | null>(null),
    close_time: new FormControl<Date | null>(null),
    rating: new FormControl<number>(0),
  });

  formSort = new FormGroup({
    name: new FormControl<'asc' | 'desc' | ''>(''),
    priceMin: new FormControl<'asc' | 'desc' | ''>(''),
    priceMax: new FormControl<'asc' | 'desc' | ''>(''),
    timeStart: new FormControl<'asc' | 'desc' | ''>(''),
    timeEnd: new FormControl<'asc' | 'desc' | ''>('')
  });

  pickComplex(id: number) {
    this.store.dispatch(selectComplex({ id }))
    this.router.navigate([`/complex/${id}`])
  }

  ngOnInit() {
    this.store.dispatch(loadComlpex({ query: `page=${this.page}&limit=${this.limit}` }));
  }

  paginate(event: PageEvent) {

    const { pageSize, pageIndex } = event;
    this.limit = pageSize;
    this.page = pageIndex + 1;
    this.pageSize = pageSize;

    this.execute();
  }

  filterQuery() {
    let query = "";

    let start = this.formFilter.get('open_time')
    if (start?.value) {
      const date: Date = start.value;
      const hours = date.getHours().toString().padStart(2, '0');
      query += `&open_time[gte]=${hours}:00`
    }

    let end = this.formFilter.get('close_time')
    if (end?.value) {
      const date: Date = end.value;
      const hours = date.getHours().toString().padStart(2, '0');
      query += `&close_time[lte]=${hours}:00`
    }


    let rating = this.formFilter.get('rating')
    if (rating?.value)
      query += `&rating=${rating.value}`

    let priceMin = this.formFilter.get('priceMin')
    if (priceMin?.value)
      query += `&priceMin[gte]=${priceMin.value}`

    let priceMax = this.formFilter.get('priceMax')
    if (priceMax?.value)
      query += `&priceMax[lte]=${priceMax.value}`

    return query;
  }

  sortQuery() {
    let query: string[] = [];

    const start = this.formSort.get('open_time');
    if (start?.value) {
      query.push(start.value === 'asc' ? 'open_time' : '-open_time');
    }

    let end = this.formSort.get('close_time');
    if (end?.value)
      query.push(end.value === 'asc' ? 'close_time' : '-close_time');

    let name = this.formSort.get('name');
    if (name?.value)
      query.push(name.value === 'asc' ? 'name' : '-name');

    let priceMin = this.formSort.get('priceMin');
    if (priceMin?.value)
      query.push(priceMin.value === 'asc' ? 'priceMin' : '-priceMin');

    let priceMax = this.formSort.get('priceMax');
    if (priceMax?.value)
      query.push(priceMax.value === 'asc' ? 'priceMax' : '-priceMax');

    if (!query.length)
      return "";

    return `&sort=${query.join(',')}`
  }

  sort(field: string) {
    const control = this.formSort.get(field);
    if (!control) return;

    const current = control.value;
    const next =
      current === '' ? 'asc' : current === 'asc' ? 'desc' : '';
    control.setValue(next);
  }

  execute() {
    let query = `page=${this.page}&limit=${this.limit || 2}`
    let filterQuery = this.filterQuery();
    let sortQuery = this.sortQuery();

    query += filterQuery + sortQuery;
    console.log(query)
    this.store.dispatch(loadComlpex({ query }))
  }

}
