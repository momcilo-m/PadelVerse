import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComplexInterface } from '../../models/complex.interface';

@Component({
  selector: 'app-edit-complex',
  imports: [CommonModule,
    MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './edit-complex.html',
  styleUrl: './edit-complex.scss'
})
export class EditComplex {

  constructor(
    public dialogRef: MatDialogRef<ComplexInterface>,
  ) { }

  complex: ComplexInterface =
    {
      city: "",
      open_time: "",
      close_time: "",
      country: "",
      name: "",
      location: { x: -1, y: -1 },
      photo: "",
      id: -1,
      owner: -1,
      rating: -1,
      votes: -1,
      priceMin: -1,
      priceMax: -1,
      reviews: -1
    }

  editComplex() {

  }

}
