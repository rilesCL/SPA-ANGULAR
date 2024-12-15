import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../../services/activite.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule
  ],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
  activities: any[] = [];
  maxDuration: number = 0;

  constructor(private activiteService: ActiviteService) {}

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activiteService.getAllActivities().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.activities = response.data.map((activity: any) => {
            const startTime = new Date(activity.debut.value);
            const endTime = activity.fin ? new Date(activity.fin.value) : new Date();
            const duration = endTime.getTime() - startTime.getTime();
            
            return {
              ...activity,
              duration,
              startTime,
              endTime
            };
          });

          // Trouver la durée maximale pour calculer les proportions
          this.maxDuration = Math.max(...this.activities.map(a => a.duration));
        }
      }
    });
  }

  calculateProgress(duration: number): number {
    return (duration / this.maxDuration) * 100;
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString();
  }

}
