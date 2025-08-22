import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Complex } from './complex';

describe('Complex', () => {
  let component: Complex;
  let fixture: ComponentFixture<Complex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Complex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Complex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
