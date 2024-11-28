import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytimeComponent } from './mytime.component';

describe('MytimeComponent', () => {
  let component: MytimeComponent;
  let fixture: ComponentFixture<MytimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MytimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
