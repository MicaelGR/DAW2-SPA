import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaDialogComponent } from './oferta-dialog.component';

describe('OfertaDialogComponent', () => {
  let component: OfertaDialogComponent;
  let fixture: ComponentFixture<OfertaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
