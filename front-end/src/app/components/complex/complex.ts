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
import { loadCourts } from '../../store/actions/complex.action';
import { selectCourts } from '../../store/selectors/complex.selector';

@Component({
  selector: 'app-complex',
  imports: [
    MatIconModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatTimepickerModule,ReactiveFormsModule
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
    endTime: new FormControl<Date | null>(null),
    player: new FormControl<number>(1),
  });

  store = inject<Store<AppState>>(Store)

  courts$ = this.store.select(selectCourts);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    const start = new Date();
    const end = new Date();
    start.setMinutes(0,0,0);
    end.setHours(start.getHours()+1,0,0,0)

    this.form.get('player')?.setValue(1)
    this.form.get('startTime')?.setValue(start)
    this.form.get('endTime')?.setValue(end)
    this.form.get('date')?.setValue(start)

    
    
    const day = start.getDate().toString().padStart(2, '0');
    const month = (start.getMonth() + 1).toString().padStart(2, '0');
    const year = start.getFullYear(); 
    const dateToSend = `${year}-${month}-${day}`;
    
    this.store.dispatch(loadCourts({
      complex:+this.id,
      date:dateToSend,
      time:start.getHours().toString().padStart(2,"0")+":00", count:2}
    ))

  };

  player = 2;

  increment() {
    const current = this.form.get('player')?.value ?? 1;
    this.form.get('player')?.setValue(current + 1);
  }

  decrement() {
    const current = this.form.get('player')?.value ?? 1;
    if (current > 1) {
      this.form.get('player')?.setValue(current - 1);
    }
  }
}
