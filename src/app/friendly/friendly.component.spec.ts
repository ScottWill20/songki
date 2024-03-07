import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlyComponent } from './friendly.component';

describe('FriendlyComponent', () => {
  let component: FriendlyComponent;
  let fixture: ComponentFixture<FriendlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
