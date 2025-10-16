import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { vote } from '../../store/actions/complex.action';

@Component({
  selector: 'app-rating',
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrl: './rating.scss'
})
export class Rating {

  @Input() rating: number = 0;
  @Input() complex!: number;

  hovered: number = 0;

  store = inject<Store<AppState>>(Store)

  get stars() {
    let rat = this.hovered || this.rating
    return Array.from({ length: 5 }, (_, i) => i < rat)
  }

  hover(id: number) {
    this.hovered = id + 1;
  }

  unHover() {
    this.hovered = 0;
  }

  vote(id: number) {
    this.store.dispatch(vote({ complex: this.complex, rating: id + 1 }))
  }
}
