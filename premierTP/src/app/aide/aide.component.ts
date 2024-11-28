import { Component } from '@angular/core';
import { aide } from '../../aide';
import { ComposantsComponent } from './composants/composants.component';
import { FonctionnementComponent } from './fonctionnement/fonctionnement.component';


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
  imports: [ComposantsComponent, FonctionnementComponent],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.css'
})
export class AideComponent {
  myAide = JSON.parse(aide).application;

}
