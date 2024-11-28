import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fonctionnement',
  standalone: true,
  imports: [],
  templateUrl: './fonctionnement.component.html',
  styleUrl: './fonctionnement.component.css'
})
export class FonctionnementComponent {
  @Input() fonctionnement!: string[];


}
