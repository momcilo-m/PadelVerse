import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/user.action';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, ReactiveFormsModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  store = inject<Store<User>>(Store)
  hide = signal(true);
  
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit()
  {
    const {email,password} = this.loginForm.value;
    this.store.dispatch(login({email:email!,password:password!}))
  }
}