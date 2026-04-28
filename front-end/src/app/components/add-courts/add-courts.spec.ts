import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourts } from './add-courts';

describe('AddCourts', () => {
  let component: AddCourts;
  let fixture: ComponentFixture<AddCourts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
