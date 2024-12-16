import { Component, Inject } from '@angular/core';
import { aide } from '../../aide';
import { ComposantsComponent } from './composants/composants.component';
import { FonctionnementComponent } from './fonctionnement/fonctionnement.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Aide, Vue } from '../interfaces/aideg';
import { Subscription } from 'rxjs';
import { AideService } from '../services/aide.service';
import { DOCUMENT, KeyValue } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


export interface IVue {
  nom: string;
  fonctionnalite: string;
  composants: {
    [nom: string]: string;
  };
  fonctionnement: string[];
  typesRapports?: string[];
}

export interface IAide {
  nom: string;
  description: string;
  vues: IVue[];
}

export interface IAideHome {
  application: IAide;
}



@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [ComposantsComponent, FonctionnementComponent, CommonModule, MatButtonModule],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.css'
})
export class AideComponent {
  aide?: Aide;
  vues: { [key: string]: Vue } = {};
  cleDeVueSelectionne?: string;
  private subscription = new Subscription();
  sectionsOuvertes: { [key: string]: boolean } = {}; // Nouvel objet pour gérer l'état

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private aideService: AideService
  ) { }

  ngOnInit() {
    const language = this.document.documentElement.lang || 'fr';
    
    this.subscription.add(
      this.aideService.getAide(language).subscribe({
        next: (data: Aide) => {
          this.aide = data;
          this.vues = data.application.vues;
        },
        error: (err) => console.error('Erreur chargement aide:', err)
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  afficherSection(cleDeVue: string) {
    // Inverse l'état de la section
    this.sectionsOuvertes[cleDeVue] = !this.sectionsOuvertes[cleDeVue];
  }

  estSectionOuverte(cleDeVue: string): boolean {
    return !!this.sectionsOuvertes[cleDeVue];
  }

  trackByKey(index: number, item: { key: string, value: Vue }): string {
    return item.key;
  }
}