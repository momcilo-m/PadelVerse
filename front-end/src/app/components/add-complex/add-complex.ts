import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-complex',
  imports: [
    CommonModule,
    MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './add-complex.html',
  styleUrl: './add-complex.scss'
})
export class AddComplex {

  name: string = ""
  open_time: string = '';
  close_time: string = '';
  location: string = ""

  constructor(public dialogRef: MatDialogRef<AddComplex>) { }

  addComplex(): void {
    const result = {
      name: this.name,
      open_time: this.open_time,
      close_time: this.close_time,
      location: this.location
    };
    this.dialogRef.close(result);
  }

  onNoClick() { }
}
