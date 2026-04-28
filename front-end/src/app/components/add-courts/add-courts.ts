import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-courts',
  imports: [CommonModule,
    MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './add-courts.html',
  styleUrl: './add-courts.scss'
})
export class AddCourts {

  name: string = ""
  price: number = 0

  constructor(public dialogRef: MatDialogRef<AddCourts>) { }

  addCourt() {
    const result = {
      name: this.name,
      price: this.price,
    };
    this.dialogRef.close(result);
  }

}
