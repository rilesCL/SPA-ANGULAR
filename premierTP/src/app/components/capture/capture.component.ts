import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActiviteService } from '../../services/activite.service';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.css'
})
export class CaptureComponent implements OnInit{
  description = '';
  currentActivity: any = null;
  manualEntry = {
    description: '',
    start: '',
    end: ''
  };

  constructor(private activiteService: ActiviteService) {}

  ngOnInit() {
    // Vérifier s'il y a une activité en cours au démarrage
    this.activiteService.getCurrentActivity().subscribe({
      next: (response: any) => {
        console.log('État initial de l\'activité:', response);
        if (response && response.length > 0) {  // Si une activité existe
          this.currentActivity = response[0];  // La première activité du tableau
        }
      },
      error: (error) => console.error('Erreur:', error)
    });
  }  

  checkCurrentActivity() {
    // Vérifiez l'état initial
    this.activiteService.getCurrentActivity().subscribe({
      next: (response: any) => {
        console.log('État de lactivité:', response);
        this.currentActivity = response.data;  // ou response selon la structure
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.currentActivity = null;
      }
    });
  }
  demarrerActivite() {
    console.log('Description à envoyer:', this.description);
    if (this.description) {
      this.activiteService.demarrerActivite(this.description).subscribe({
        next: (response) => {
          console.log('Réponse du serveur:', response);
          this.currentActivity = response;
        },
        error: (error) => {
          console.error('Erreur détaillée:', error);
        }
      });
    }
  }
  

  arreterActivite() {
    this.activiteService.arreterActivite().subscribe({
      next: () => {
        console.log('Activité terminée');
        this.currentActivity = null;
        this.description = '';
      },
      error: (error) => {
        console.error('Erreur détaillée:', error);
      }
    });
  }

  createManualEntry() {
    this.activiteService.createManualEntry(this.manualEntry).subscribe({
      next: () => {
        console.log('Entrée manuelle créée');
        // Réinitialiser le formulaire
        this.manualEntry = {
          description: '',
          start: '',
          end: ''
        };
      },
      error: (error) => console.error('Erreur:', error)
    });
  }

}
