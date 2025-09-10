import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { loadCourts, selectComplex, selectCourt } from '../../store/actions/complex.action';
import { selectAvailable, selectComplexes, selectCourts, selectedComplex, selectedCourt } from '../../store/selectors/complex.selector';
import { combineLatest, defaultIfEmpty, distinctUntilChanged, filter, last, map, Observable, startWith, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ComplexInterface } from '../../models/complex.interface';

@Component({
  selector: 'app-complex',
  imports: [
    MatIconModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatTimepickerModule,ReactiveFormsModule,
    AsyncPipe,GoogleMapsModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './complex.html',
  styleUrl: './complex.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Complex {

  constructor(private route: ActivatedRoute) {}
  
  private id:string = "";
  
  form = new FormGroup({
    date: new FormControl<Date | null>(null),
    startTime: new FormControl<Date | null>(null),
    count: new FormControl<number>(1),
    court : new FormControl<number>(-1),
  });
  
  store = inject<Store<AppState>>(Store)
  
  courts$ = this.store.select(selectCourts);
  available$ = this.store.select(selectAvailable)
  selectedCourt:number=-1;
  
  location$: Observable<{lat: number, lng: number}> = this.store.select(selectComplexes).pipe(
    map(complexes => complexes.find(complex => complex.id === Number(this.id))),
    map(complex => complex ? {lat: complex.location.x, lng: complex.location.y} : {lat: 42, lng: 23})
  );

  location : {lat:number, lng:number} = {lat: 42, lng: 23}
  city:String="";
  country:String = "";
  price:number=1;

  complex$ = combineLatest([
      this.store.select(selectComplexes),
      this.store.select(selectedComplex)])
    .pipe(
      map(([complexes, id]) => complexes.find(c => c.id === id))
    )
    .subscribe(complex=>{
      this.location = {lat:complex?.location.x || 42, lng:complex?.location.y || 23};
      this.city = complex?.city || ""
      this.country = complex?.country || ""
      this.price = complex?.price || 1;

      console.log(this.location, this.city, this.country)
    })

  courtsWithStatus$ = combineLatest([this.courts$, this.available$]).pipe(
    map(([courts$,available$])=>{
      if(!courts$) return []

      return courts$.map(el=>
        ({
          ...el,
          isAvailable:available$.includes(el.id)
        })
      )
    })
  )

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    const start = new Date();
    start.setMinutes(0,0,0);
    start.setHours(start.getHours() + 1);
    
    this.form.get('count')?.setValue(1)
    this.form.get('startTime')?.setValue(start)
    this.form.get('date')?.setValue(start)
    this.form.get('court')?.setValue(-1);
    
    const day = start.getDate().toString().padStart(2, '0');
    const month = (start.getMonth() + 1).toString().padStart(2, '0');
    const year = start.getFullYear(); 
    const dateToSend = `${year}-${month}-${day}`;
    
    this.store.dispatch(loadCourts({
      complex:+this.id,
      date:dateToSend,
      time:start.getHours().toString().padStart(2,"0")+":00", count:1}
    ))

    this.store.dispatch(selectComplex({id:Number(this.id)}))
  };

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

  onClickCourt(id:number)
  {
    this.form.get('court')?.setValue(id);
  }
}
