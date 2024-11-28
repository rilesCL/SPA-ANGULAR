import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink, RouterModule, AuthService],
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

  constructor(private router: Router) {}


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
  


  quitterSession() {
    this.sessionExist = false;
    this.showLogoutMessage = true;
  }

}
