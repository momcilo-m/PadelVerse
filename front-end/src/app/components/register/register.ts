import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { User } from '../../models/user.interface';
import { register } from '../../store/actions/user.action';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  store = inject<Store<AppState>>(Store)
  hide = true;

  registerForm = new FormGroup({
    first_name: new FormControl('nikola', [Validators.required, Validators.maxLength(50)]),
    last_name: new FormControl('nikolic', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('nikola@nikola.rs', [Validators.required, Validators.email]),
    password: new FormControl('Nikola123!', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl(381658793126, [Validators.required, Validators.maxLength(15)]),
    birth: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    gender: new FormControl(false, [Validators.required])
  });

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onSubmit() {
    let user: UserRegisterInterface =
    {
      first_name: this.registerForm.get('first_name')!.value!.toString(),
      last_name: this.registerForm.get('last_name')!.value!.toString(),
      birth: this.registerForm.get('birth')!.value!.toString(),
      gender: this.registerForm.get('gender')!.value as boolean,
      email: this.registerForm.get('email')!.value!.toString(),
      password: this.registerForm.get('password')!.value!.toString(),
      phone: "+" + this.registerForm.get('phone')!.value!.toString()
    }

    this.store.dispatch(register({ user }))
  }
}
