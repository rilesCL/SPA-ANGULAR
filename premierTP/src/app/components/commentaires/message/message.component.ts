import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMessage } from '../../../interfaces/messages';
import { FormsModule } from '@angular/forms';
import { EtoilesComponent } from '../etoiles/etoiles.component';
import { NgClass } from '@angular/common';
import { Console, error } from 'console';
import { MessageService } from '../../../services/message.service';

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

  message = {
    contenu: '',
    rating: 0
  };

  constructor(private messageService: MessageService) {}

  ajouterMessage() {
    if (this.message.contenu && this.message.rating > 0) {
      this.messageService.postMessage(this.message.contenu, this.message.rating).subscribe({
        next:() => {
          console.log('Message ajouté avec succès');

          // Reset the form
          this.message = {
            contenu: '',
            rating: 0
          };
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du message', error);
      }
    });
}
}
}