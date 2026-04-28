import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-complex-card',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './complex-card.html',
  styleUrl: './complex-card.scss'
})
export class ComplexCard {
  @Input() photo!: string;
  @Input() name!: string;
  @Input() city!: string;
  @Input() country!: string;
  @Input() openTime!: string;
  @Input() closeTime!: string;
  @Input() price!: string;
  @Input() rating!: number;
  @Input() votes!: number;
  @Input() priceMin!: number;
  @Input() priceMax!: number;
}
