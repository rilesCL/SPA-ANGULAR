import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

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
  userProfile: any = null;
  isEditing = false;
  editForm = {
    nom: '',
    prenom: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (err) => console.error('Erreur chargement profil:', err)
    });
  }

  startEditing() {
    this.editForm = {
      nom: this.userProfile.nom,
      prenom: this.userProfile.prenom
    };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm = {
      nom: '',
      prenom: ''
    };
  }

  saveChanges() {
    this.userService.updateProfile(this.editForm).subscribe({
      next: () => {
        this.isEditing = false;
        this.loadProfile();  // Recharger le profil
      },
      error: (err) => console.error('Erreur mise à jour:', err)
    });
  }
}
