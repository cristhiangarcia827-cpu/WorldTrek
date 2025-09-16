import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nuevoviaje } from './nuevoviaje';

describe('Nuevoviaje', () => {
  let component: Nuevoviaje;
  let fixture: ComponentFixture<Nuevoviaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nuevoviaje]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nuevoviaje);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
