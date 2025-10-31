import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { booking, loadCourts, selectComplex, selectCourt } from '../../store/actions/complex.action';
import { selectAvailable, selectComplexes, selectCourts, selectedComplexID, selectedCourt } from '../../store/selectors/complex.selector';
import { combineLatest, defaultIfEmpty, distinctUntilChanged, filter, last, map, Observable, startWith, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ComplexInterface } from '../../models/complex.interface';
import { selectError } from '../../store/selectors/request.selector';
import { selectWeather } from '../../store/selectors/weather.selector';
import { Rating } from '../rating/rating';

@Component({
  selector: 'app-complex',
  imports: [
    MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTimepickerModule, ReactiveFormsModule,
    AsyncPipe, GoogleMapsModule, Rating
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './complex.html',
  styleUrl: './complex.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Complex {

  constructor(private route: ActivatedRoute) { }

  today: Date = new Date();

  id: string = "";
  location: { lat: number, lng: number } = { lat: 42, lng: 23 }
  city: String = "";
  country: String = "";
  price: number = 1;
  vote: number = 0;

  form = new FormGroup({
    date: new FormControl<Date>(new Date()),
    startTime: new FormControl<Date | null>(new Date()),
    count: new FormControl<number>(1),
    court: new FormControl<number>(-1),
  });

  store = inject<Store<AppState>>(Store)

  courts$ = this.store.select(selectCourts);
  available$ = this.store.select(selectAvailable)
  selectedCourtId$ = this.store.select(selectedCourt)
  weather$ = this.store.select(selectWeather);
  messageError$ = this.store.select(selectError);

  complex$ = combineLatest([
    this.store.select(selectComplexes),
    this.store.select(selectedComplexID)])
    .pipe(
      map(([complexes, id]) => complexes.find(c => c.id === id))
    )
    .subscribe(complex => {
      this.location = { lat: complex?.location.x || 42, lng: complex?.location.y || 23 };
      this.city = complex?.city || ""
      this.country = complex?.country || ""
      this.vote = complex?.reviews || 0
      console.log(this.location, this.city, this.country, this.vote)
    })

  courtsWithStatus$ = combineLatest([this.courts$, this.available$]).pipe(
    map(([courts$, available$]) => {
      if (!courts$) return []

      return courts$.map(el =>
      ({
        ...el,
        isAvailable: available$.includes(el.id),
      })
      )
    })
  )


  selectedCourt$ = combineLatest([this.courts$, this.selectedCourtId$]).pipe(
    map(([courts, id]) => courts.find(c => c.id === id) ?? null),
  );

  price$ = this.selectedCourt$.pipe(
    map(court => court ? court.price : 0),
  )


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    const start = new Date();

    this.form.get('count')?.setValue(1)
    this.form.get('startTime')?.setValue(start)
    this.form.get('date')?.setValue(start)
    this.form.get('court')?.setValue(-1);

    this.store.dispatch(loadCourts({
      complex: +this.id,
      date: this.transformDate(start),
      time: this.transformTime(start, 1),
      count: 1,
    }))

    this.store.dispatch(selectComplex({ id: Number(this.id) }))
  };

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.checkAvailable();
    });
  }

  increment() {
    const current = this.form.get('count')?.value ?? 1;
    this.form.get('count')?.setValue(current + 1);
  }

  decrement() {
    const current = this.form.get('count')?.value ?? 1;
    if (current > 1) {
      this.form.get('count')?.setValue(current - 1);
    }
  }

  checkAvailable() {
    let complex = +this.id;
    let count = this.form.get('count')?.value || -1;
    let time = this.form.get('startTime')?.value || new Date();
    let date = this.form.get('date')?.value || new Date();

    console.log(this.transformTime(time, 0), this.transformDate(date), complex, count)

    let xx = this.transformDate(date);
    console.log(xx);

    if (complex == -1 || count == -1) {
      return;
    }

    this.store.dispatch(loadCourts({
      complex: +this.id,
      date: this.transformDate(date),
      time: this.transformTime(time, 0),
      count,
    }))
  }

  onClickCourt(id: number, isAvailable: boolean, event?: Event) {
    event?.preventDefault();
    if (isAvailable) {
      this.form.get('court')?.setValue(id);
      this.store.dispatch(selectCourt({ id }))
    }

  }

  checkout() {
    let complex = +this.id;
    let court = this.form.get("court")?.value || -1;
    let count = this.form.get('count')?.value || -1;
    let date = this.form.get('date')?.value;
    let time = this.form.get("startTime")?.value || null;

    if (complex == -1 || court == -1 || count == -1 || !date || !time) {
      return;
    }

    let dateString = this.transformDate(date)
    let timeString = this.transformTime(time, 0);

    this.store.dispatch(booking({ complex, court, count, date: dateString, time: timeString }))
  }

  transformDate(start: Date): string {
    const day = start.getDate().toString().padStart(2, '0');
    const month = (start.getMonth() + 1).toString().padStart(2, '0');
    const year = start.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private transformTime(start: Date, offset: number): string {
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + offset);
    return start.getHours().toString().padStart(2, "0") + ":00";
  }

  onAnyEvent(event: any, type: string) {
    console.log(type, event);
  }

}
