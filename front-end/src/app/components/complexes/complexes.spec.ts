import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Complexes } from './complexes';

describe('Complex', () => {
  let component: Complexes;
  let fixture: ComponentFixture<Complexes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Complexes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Complexes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
