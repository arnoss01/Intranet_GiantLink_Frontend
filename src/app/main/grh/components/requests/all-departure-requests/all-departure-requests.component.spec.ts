import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDepartureRequestsComponent } from './all-departure-requests.component';

describe('AllDepartureRequestsComponent', () => {
  let component: AllDepartureRequestsComponent;
  let fixture: ComponentFixture<AllDepartureRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDepartureRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDepartureRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
