import { Component, Input } from '@angular/core';
import { IMessage } from '../../../interfaces/messages';
import { DatePipe } from '@angular/common';
import { EtoilesComponent } from '../etoiles/etoiles.component';
import { OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vue-messages',
  standalone: true,
  imports: [DatePipe, EtoilesComponent],
  templateUrl: './vue-messages.component.html',
  styleUrl: './vue-messages.component.css'
})
export class VueMessagesComponent implements OnInit{
  @Input() messages: IMessage[] = [];
  currentUser: string | null = null;
  


  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {
    // S'abonner aux changements d'utilisateur
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    // Charger les messages
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({
      next: (response: any) => {
        this.messages = response;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des messages', error);
      }
    });
}
canDeleteMessage(message: any): boolean {
  return this.currentUser !== null && 
         (message.userid === '' || 
          message.userid === this.currentUser);
}

deleteMessage(id: string) {  const token = localStorage.getItem('token');
  const headers = { 'Authorization': token || '' };

  this.messageService.deleteMessage(id, headers).subscribe({
      next: () => {
          this.loadMessages();
      },
      error: (error) => console.error('Erreur:', error)
  });
}
}