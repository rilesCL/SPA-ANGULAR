import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueMessagesComponent } from './vue-messages.component';

describe('VueMessagesComponent', () => {
  let component: VueMessagesComponent;
  let fixture: ComponentFixture<VueMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
