import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumArtComponent } from './album-art.component';

describe('AlbumArtComponent', () => {
  let component: AlbumArtComponent;
  let fixture: ComponentFixture<AlbumArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumArtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
