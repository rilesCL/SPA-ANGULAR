import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';





/*
- Nom
- Prénom
- Courriel
- Adresse (US vs Can)
  - Numéro civique
  - Rue
  - Ville
  - Province (Can)
  - Pays (Select avec Canada et États-unis)
  - Code postal (Can)
  - État (US)
  - Zip (US)
*/

export interface IEnregistrement {
  nom: string;
  prenom: string;
  courriel: string;
  adresse: {
    numero: string;
    rue: string;
    ville: string;
    province?: string;
    pays: string;
    codePostal?: string;
    etat?: string;
    zip?: string;
  };
  motdepasse?: string;
  confirmation?: string;
}


@Component({
  selector: 'app-enregistrement',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule,  MatButtonModule, CommonModule, MatButton],
  templateUrl: './enregistrement.component.html',
  styleUrl: './enregistrement.component.css'
})
export class EnregistrementComponent {
  @Output() newEnregistrement = new EventEmitter<IEnregistrement | undefined>();

  enregistrement: IEnregistrement = {
    nom: '',
    prenom: '',
    courriel: '',
    adresse: {
      numero: '',
      rue: '',
      ville: '',
      pays: 'canada'
    }
  };


//PARTIE DU TP 2 ( règles de validation des champs )
  nomInvalide = false;
  prenomInvalide = false;
  courrielInvalide = false;
  numeroInvalide = false;
  rueInvalide = false;
  villeInvalide = false;
  codePostalInvalide = false;
  zipInvalide = false;
  motDePasseInvalide = false;
  confirmationInvalide = false;

  constructor(private router: Router) {}

 
  validateNom() {
    // Le pattern s'occupe déjà de vérifier les chiffres
    this.nomInvalide = this.enregistrement.nom.length < 2 || !/^[A-Za-zÀ-ÿ\s]*$/.test(this.enregistrement.nom);
    return this.nomInvalide;
}


  validatePrenom() {
    const hasNumbers = /\d/.test(this.enregistrement.prenom);
    const tooShort = this.enregistrement.prenom.length < 2;
    this.prenomInvalide = hasNumbers || tooShort;
    return this.prenomInvalide;
  }

  validateCourriel() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.courrielInvalide = !emailPattern.test(this.enregistrement.courriel);
  }

  validateNumero() {
    this.numeroInvalide = isNaN(Number(this.enregistrement.adresse.numero));
  }

  validateRue() {
    this.rueInvalide = this.enregistrement.adresse.rue.length < 10;
  }

  validateVille() {
    this.villeInvalide = this.enregistrement.adresse.ville.length < 5;
  }

 
  validateCodePostal() {
    if (this.enregistrement.adresse.pays.toLowerCase() === 'canada') {
      const codePostalPattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

      this.codePostalInvalide = !codePostalPattern.test(this.enregistrement.adresse.codePostal || '');
    } else {
      this.codePostalInvalide = false;
    }
  }

  validateZip() {
    if (this.enregistrement.adresse.pays.toLowerCase() === 'us') {
      this.zipInvalide = !(this.enregistrement.adresse.zip && this.enregistrement.adresse.zip.length === 5 && /^\d+$/.test(this.enregistrement.adresse.zip));
    } else {
      this.zipInvalide = false;
    }
  }

  validateMotDePasse() {
    this.motDePasseInvalide = (this.enregistrement.motdepasse || '').length < 8;
  }

  validateConfirmation() {
    this.confirmationInvalide = this.enregistrement.motdepasse !== this.enregistrement.confirmation;
  }

//FIN DE LA PARTIE DU TP 2

  enregistrer() {
    console.log(this.enregistrement);
    this.newEnregistrement.emit(this.enregistrement);
    this.router.navigate(['/mytime']);
  }

  annuler() {
    this.newEnregistrement.emit(undefined);
    this.router.navigate(['/mytime']);
  }
}
