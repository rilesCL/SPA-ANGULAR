import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  profile: any;
  isEditing = false;
  editForm = {
    nom: '',
    prenom: ''
  };

  constructor(private profilService: ProfilService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    console.log('Chargement du profil...');
    this.profilService.getProfile().subscribe({
      next: (response: any) => {
        console.log('Réponse complète:', response);
        this.profile = response.profile;
        console.log('Profile chargé:', this.profile);
      },
      error: (err) => {
        console.error('Erreur détaillée:', err);
        // Si erreur CORS, on le verra ici
      }
    });
}

  startEditing() {
    this.editForm = {
      nom: this.profile?.nom || '',
      prenom: this.profile?.prenom || ''
    };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    console.log('Tentative de sauvegarde:', this.editForm);
    this.profilService.updateProfile(this.editForm).subscribe({
      next: (response: any) => {
        console.log('Sauvegarde réussie:', response);
        this.isEditing = false;
        this.loadProfile();
      },
      error: (err) => {
        console.error('Erreur détaillée:', err);
        // Optionnellement, afficher un message d'erreur à l'utilisateur
      }
    });
  }
}

