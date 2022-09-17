import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeVacationComponent } from './add-employee-vacation.component';

describe('EmployeeVacationComponent', () => {
  let component: AddEmployeeVacationComponent;
  let fixture: ComponentFixture<AddEmployeeVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeVacationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
