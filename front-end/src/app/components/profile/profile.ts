import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectUser } from '../../store/selectors/user.selector';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, take } from 'rxjs';


@Component({
  selector: 'app-profile',
  imports: [CommonModule,MatTabsModule,MatIcon,MatFormFieldModule, MatInputModule,ReactiveFormsModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  standalone:true
})
export class Profile {

  store = inject<Store<AppState>>(Store)

  editMode = false;

  user$ = this.store.select(selectUser);

  form = new FormGroup({
    name: new FormControl<String>(""),
    email: new FormControl<String>(""),
    phone: new FormControl<String>(""),
    photo: new FormControl<String>("https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D")
  });
  
  formPassword = new FormGroup({
    password:new FormControl<String>(""),
    newPassword:new FormControl<String>(""),
    confirmPassword:new FormControl<String>(""),
  });

  ngOnInit() {
    this.user$.pipe(
      filter(el=>el!=null),
      take(1)).subscribe(user => {
        this.form.patchValue({
          name: user.first_name,
          phone: user.phone,
          email: user.email,
        });
    });
  }

  saveProfile()
  {}

  onFileSelected(){}

  updatePassword(){}
}
