import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMessage } from '../../../interfaces/messages';
import { FormsModule } from '@angular/forms';
import { EtoilesComponent } from '../etoiles/etoiles.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule, EtoilesComponent, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Output() newMessage = new EventEmitter<IMessage>();
  @Input() minimize!: boolean;

  message: IMessage = {
    id: 0,
    contenu: '',
    rating: 0,
    date: new Date(),
    auteur: ''
  };

  ajouterMessage() {
    this.message.date = new Date();
    this.message.id = Math.floor(Math.random() * 1000);
    this.message.auteur = 'Anonyme';
    console.log(this.message);
    this.newMessage.emit(this.message);
    this.message = {
      id: 0,
      contenu: '',
      rating: 0,
      date: new Date(),
      auteur: ''
    };
  }

}
