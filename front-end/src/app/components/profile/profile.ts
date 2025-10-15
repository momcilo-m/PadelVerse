import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectUser } from '../../store/selectors/user.selector';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, map, take, tap } from 'rxjs';
import { updateProfile, updateProfileImage } from '../../store/actions/user.action';
import { User } from '../../models/user.interface';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatTabsModule, MatIcon, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  standalone: true
})
export class Profile {

  //Trazimo ga po "id-u", tj po reference varijabli
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  store = inject<Store<AppState>>(Store)

  editMode = false;


  // private user: User | null = null;

  user$ = this.store.select(selectUser)

  form = new FormGroup({
    first_name: new FormControl<string>(""),
    last_name: new FormControl<string>(""),
    email: new FormControl<string>(""),
    phone: new FormControl<string>(""),
    photo: new FormControl<string>(""),
    gender: new FormControl<Boolean>(true),
    file: new FormControl<File | null>(null)
    //https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D
  });

  formPassword = new FormGroup({
    password: new FormControl<string>(""),
    newPassword: new FormControl<string>(""),
    confirmPassword: new FormControl<string>(""),
  });

  ngOnInit() {
    this.user$.pipe(
      filter(el => el != null),
      //take(1))
    ).subscribe(user => {
      this.form.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        photo: user.photo,
        gender: user.gender
      });
    });
  }

  updateProfile() {

    let email = this.form.get("email")?.value ?? undefined
    let phone = this.form.get("phone")?.value ?? undefined
    let first_name = this.form.get("first_name")?.value ?? undefined
    let last_name = this.form.get("last_name")?.value ?? undefined
    let file = this.form.get("file")?.value

    if (this.form.dirty)
      this.store.dispatch(updateProfile({ email, phone, first_name, last_name }))


    if (this.fileInput.nativeElement.files?.length == 1 && file) {
      this.store.dispatch(updateProfileImage({ file }))
    }

  }

  onFileSelected() {
    this.form.get("file")?.setValue(this.fileInput.nativeElement.files!.item(0))
  }

  updatePassword() { }
}
