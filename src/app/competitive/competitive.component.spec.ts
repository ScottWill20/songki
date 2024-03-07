import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiveComponent } from './competitive.component';

describe('CompetitiveComponent', () => {
  let component: CompetitiveComponent;
  let fixture: ComponentFixture<CompetitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
