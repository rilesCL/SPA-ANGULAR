import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtoilesComponent } from './etoiles.component';

describe('EtoilesComponent', () => {
  let component: EtoilesComponent;
  let fixture: ComponentFixture<EtoilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtoilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtoilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
