import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';



@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Output() vueCompact = new EventEmitter<void>();
  @Output() vueSelection = new EventEmitter<string>();
  @Output() creerCompteEvent = new EventEmitter<void>();

  courriel = '';
  motDePasse = '';
  sessionExist = true;
  forcePanelActif = false;
  showLogoutMessage = false;

  commentCount: number = 0;


 // Ajouter une propriété pour le nom d'utilisateur courant
  currentUser: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
) {
    this.authService.getCurrentUser().subscribe({
        next: (username) => {
            this.sessionExist = !!username;
            if (username) {
                this.currentUser = username;
                console.log('Utilisateur connecté:', username);
            }
        },
        error: (error) => {
            console.error('Erreur de récupération utilisateur:', error);
        }
    });
    this.messageService.getMessagesCount().subscribe({
      next: (response) => {
        console.log('Response a regarder:', response[0].commentaires);  
        this.commentCount = response[0].commentaires;
      },
      error: (error) => {
          console.error('Erreur compteur:', error);
      }
  });
  

}
          
        

        login() {
          console.log('Tentative de connexion avec:', this.courriel, this.motDePasse); // Pour déboguer
          this.authService.login(this.courriel, this.motDePasse).subscribe({
            next: () => {
              console.log('Connexion réussie !');


              this.courriel = '';
              this.motDePasse = '';
              this.sessionExist = true;
            },
            error: (error) => {
              console.error('Erreur de connexion', error);
              this.sessionExist = false;
            }
          });
        }
  
        

  toggleVue() {
    const currentUrl = this.router.url.split('?')[0]; // Obtient l'URL sans paramètres
    this.router.navigate([currentUrl], { 
      queryParams: { compact: 'true' } 
    });
  }

  selectionVue(vue: string) {
    switch(vue) {
      case 'commentaires':
          this.router.navigate(['/mytime/comments']);
          break;
      case 'intro':
          this.router.navigate(['/mytime']); 
          break;
          case 'aide':
            this.router.navigate(['/mytime/aide']);
            break;
            case 'capture':
              this.router.navigate(['/mytime/capture']);
              break;
  }

  }

  creerCompte() {
    console.log('Créer un compte', this.courriel, this.motDePasse);
    this.creerCompteEvent.emit();
    this.sessionExist = true;
    this.router.navigate(['/enregistrement']);
  }

  activePanel() {
    this.forcePanelActif = true;
  }

  restorePanel() {
    this.forcePanelActif = false;
  }
  



  // on modifie la méthode de déconnexion
  quitterSession() {
    this.authService.logout().subscribe({
      next: () => {
        this.showLogoutMessage = true;
      },
      error: (error) => {
        console.error('Erreur de déconnexion:', error);
      }
    });
  }
}