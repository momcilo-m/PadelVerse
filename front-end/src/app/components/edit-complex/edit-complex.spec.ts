import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplex } from './edit-complex';

describe('EditComplex', () => {
  let component: EditComplex;
  let fixture: ComponentFixture<EditComplex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComplex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComplex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
