import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.bgVideo.nativeElement.play().catch(() => {});
  }

}