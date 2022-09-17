import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHolidayRequestsComponent } from './all-holiday-requests.component';

describe('AllHolidayRequestsComponent', () => {
  let component: AllHolidayRequestsComponent;
  let fixture: ComponentFixture<AllHolidayRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHolidayRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHolidayRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
