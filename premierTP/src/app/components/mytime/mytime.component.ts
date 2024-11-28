import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { IntroComponent } from '../intro/intro.component';
import { RouterOutlet } from '@angular/router';
import { NavigationCompacteComponent } from '../navigation-compacte/navigation-compacte.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mytime',
  standalone: true,
  imports: [ CommonModule, NavigationComponent, IntroComponent, RouterOutlet, NavigationCompacteComponent ],
  templateUrl: './mytime.component.html',
  styleUrl: './mytime.component.css'
})
export class MytimeComponent {
  compact = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.compact = params['compact'] === 'true';
    });
  }
}
