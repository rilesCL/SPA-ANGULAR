import { NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { ActiviteService } from '../../services/activite.service';



@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
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

  currentActivity: any = null;
  tempsEcoule:string = '';
  private timer: any;
  private activityCheckInterval: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private activiteService: ActiviteService
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
  this.activiteService.activityStateChanged$.subscribe(() => {
    console.log('État de l\'activité modifié - Rafraîchissement');
    this.checkCurrentActivity();
  });

}


ngOnInit() {
  this.checkActivity();

    // Puis vérifier toutes les 30 secondes au lieu de chaque seconde
    this.activityCheckInterval = setInterval(() => {
      this.checkActivity();
    }, 30000);
}

checkActivity() {
  this.activiteService.getCurrentActivity().subscribe({
    next: (response: any) => {
      // Mettre à jour uniquement si l'état a changé
      if (response && response.length > 0) {
        // Nouvelle activité détectée
        if (!this.currentActivity || this.currentActivity.id !== response[0].id) {
          this.currentActivity = response[0];
          this.startTimer(new Date(this.currentActivity.debut.value));
        }
      } else if (this.currentActivity) {
        // Activité terminée
        this.currentActivity = null;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.tempsEcoule = '';
      }
    }
  });
}


checkCurrentActivity() {
  console.log('Vérification activité en cours');
  this.activiteService.getCurrentActivity().subscribe({
    next: (response: any) => {
      console.log('Réponse getCurrentActivity:', response);
      if (response && response.length > 0) {
        console.log('Activité trouvée, démarrage timer');
        this.currentActivity = response[0];
        this.startTimer(new Date(this.currentActivity.debut.value));
      } else {
        console.log('Aucune activité en cours');
        this.currentActivity = null;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }
  });
}

startTimer(startTime: Date) {
  if (this.timer) {
    clearInterval(this.timer);
  }
  
  this.timer = setInterval(() => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    this.tempsEcoule = `${minutes}m ${seconds}s`;
  }, 1000);
}

ngOnDestroy() {
  if (this.timer) {
    clearInterval(this.timer);
  }
  if (this.activityCheckInterval) {
    clearInterval(this.activityCheckInterval);
  }
}

  refreshActivityState() {
    this.activiteService.getCurrentActivity().subscribe({
      next: (response: any) => {
        console.log('État activité mis à jour:', response);
        if (response && response.length > 0) {
          this.currentActivity = response[0];
          this.startTimer(new Date(this.currentActivity.debut.value));
        } else {
          // Aucune activité en cours
          this.currentActivity = null;
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
          this.tempsEcoule = '';
        }
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
              case 'rapport':
                this.router.navigate(['/mytime/rapport']);
                break;
                case 'profile':
                  this.router.navigate(['/mytime/profil']);
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