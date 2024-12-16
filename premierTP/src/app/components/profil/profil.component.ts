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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    console.log('Début loadProfile');
    this.userService.getUserProfile().subscribe({
        next: (response: any) => {
            console.log('Réponse complète:', response);
            if (response) {
                console.log('Data trouvée:', response);
                this.userProfile = response;
            } else {
                console.log('Pas de data dans la réponse');
            }
        },
        error: (err) => {
            console.error('Erreur détaillée:', err);
        }
    });
}

  startEditing() {  // Ajout de la méthode manquante
    this.isEditing = true;
  }
}
