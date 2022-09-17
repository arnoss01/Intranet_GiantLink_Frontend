import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAbsenceRequestsComponent } from './all-absence-requests.component';

describe('AllAbsenceRequestsComponent', () => {
  let component: AllAbsenceRequestsComponent;
  let fixture: ComponentFixture<AllAbsenceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAbsenceRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAbsenceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
