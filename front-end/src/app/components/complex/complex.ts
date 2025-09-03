import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTimepickerModule} from '@angular/material/timepicker';

@Component({
  selector: 'app-complex',
  imports: [
    MatIconModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatTimepickerModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './complex.html',
  styleUrl: './complex.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Complex {

  constructor(private route: ActivatedRoute) {}
  private id:string = "";

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
  };


  count = 2;

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
    }
  }

}
