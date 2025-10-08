import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-add-complex',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatButton,
    MatDialogActions, MatDialogContent
  ],
  templateUrl: './add-complex.html',
  styleUrl: './add-complex.scss'
})
export class AddComplex {

  // name: string = ""
  // open_time: string = '';
  // close_time: string = '';
  // location: string = "";
  // country: string = "";
  // city: string = "";

  constructor(
    public dialogRef: MatDialogRef<AddComplex>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string,
      open_time: string,
      close_time: string,
      location: string,
      country: string,
      city: string
    }
  ) { }

  addComplex(): void {
    const result = {
      name: this.data.name,
      open_time: this.data.open_time,
      close_time: this.data.close_time,
      location: this.data.location,
      city: this.data.city,
      country: this.data.country
    };
    this.dialogRef.close(result);
  }

  onNoClick() { }
}
