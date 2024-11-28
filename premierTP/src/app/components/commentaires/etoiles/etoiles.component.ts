import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-etoiles',
  standalone: true,
  imports: [NgClass],
  templateUrl: './etoiles.component.html',
  styleUrl: './etoiles.component.css'
})
export class EtoilesComponent {
  @Output() ratingChange = new EventEmitter<number>();
  @Input() rating!: number;
  @Input() canBeModified: boolean = false;

  setRating(rating: number) {
    if (this.canBeModified) {
    this.rating = rating;
    this.ratingChange.emit(rating);
    }
  }

  nb_etoiles = 5;
  etoiles = Array(this.nb_etoiles).fill(0);

}
