import { Component, Input } from '@angular/core';
import { IMessage } from '../../../interfaces/messages';
import { DatePipe } from '@angular/common';
import { EtoilesComponent } from '../etoiles/etoiles.component';

@Component({
  selector: 'app-vue-messages',
  standalone: true,
  imports: [DatePipe, EtoilesComponent],
  templateUrl: './vue-messages.component.html',
  styleUrl: './vue-messages.component.css'
})
export class VueMessagesComponent {
  @Input() messages: IMessage[] = [];
}
