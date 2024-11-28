import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationCompacteComponent } from './components/navigation-compacte/navigation-compacte.component';
import { IntroComponent } from './components/intro/intro.component';
import { CommentairesComponent } from './components/commentaires/commentaires.component';
import { AideComponent } from './aide/aide.component';
import { EnregistrementComponent } from './components/enregistrement/enregistrement.component';
import { NgClass } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MytimeComponent } from './components/mytime/mytime.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavigationComponent,
    NavigationCompacteComponent,
    IntroComponent,
    CommentairesComponent,
    AideComponent,
    NgClass,
    EnregistrementComponent,
    PageNotFoundComponent, 
    MytimeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuCompact = false;
  navigation = "intro";
  enregistrement = false;

  toggleVue() {
    this.menuCompact = !this.menuCompact;
  }

  setNavigation(navigation: string) {
    console.log("setNavigation", navigation);
    this.navigation = navigation;
  }

  creerCompte() {
    this.enregistrement = true;
  }

}
