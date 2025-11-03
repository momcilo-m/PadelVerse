import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-match-card',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './match-card.html',
  styleUrl: './match-card.scss',
})
export class MatchCard {
  @Input() id!:string;
  @Input() team1Name!: string;
  @Input() team2Name!: string;
  @Input() live!: boolean;
  @Input() team1Photo!: string;
  @Input() team2Photo!: string;
}
