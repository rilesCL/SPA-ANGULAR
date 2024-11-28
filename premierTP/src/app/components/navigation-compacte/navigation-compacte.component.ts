import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-compacte',
  standalone: true,
  imports: [],
  templateUrl: './navigation-compacte.component.html',
  styleUrl: './navigation-compacte.component.css'
})
export class NavigationCompacteComponent {
  @Output() vueCompact = new EventEmitter<void>();
  constructor(private router: Router) {}

  toggleVue() {
    const currentUrl = this.router.url.split('?')[0];
    this.router.navigate([currentUrl]);  }

}
