import { Component, Input } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { VueMessagesComponent } from './vue-messages/vue-messages.component';
import { IMessage } from '../../interfaces/messages';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [MessageComponent, VueMessagesComponent, NgClass],
  templateUrl: './commentaires.component.html',
  styleUrl: './commentaires.component.css'
})
export class CommentairesComponent {
  messages: IMessage[] = [];
  @Input() minimize!: boolean;

  ajouterMessage(message: IMessage) {
    this.messages.push(message);
  }
}
