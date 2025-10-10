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
      id: -1,
      location: { x: -1, y: -1 },
      name: "",
      owner: -1,
      photo: ""
    }

  editComplex() {

  }

}
