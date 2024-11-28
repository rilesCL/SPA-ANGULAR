import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-composants',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './composants.component.html',
  styleUrl: './composants.component.css'
})
export class ComposantsComponent {
  @Input() composants!: { [nom: string]: string };

  getComposantKeys(): string[] {
    return Object.keys(this.composants);
  }
  
}
