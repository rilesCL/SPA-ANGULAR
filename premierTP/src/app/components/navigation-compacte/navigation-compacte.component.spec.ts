import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCompacteComponent } from './navigation-compacte.component';

describe('NavigationCompacteComponent', () => {
  let component: NavigationCompacteComponent;
  let fixture: ComponentFixture<NavigationCompacteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationCompacteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationCompacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
