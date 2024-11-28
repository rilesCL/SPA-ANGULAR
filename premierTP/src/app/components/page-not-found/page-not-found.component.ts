import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { PortalModule } from '@angular/cdk/portal';


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ CommonModule, ClipboardModule, PortalModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  showCopyMessage = false;
  currentUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUrl = this.router.url;
  }

  goHome() {
    this.router.navigate(['/mytime']);
  }

  ngOnInit() {
    if (this.showCopyMessage) {
      setTimeout(() => {
        this.showCopyMessage = false;
      }, 3000);
    }
  }
}