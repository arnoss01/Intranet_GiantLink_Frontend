import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaterialRequestsComponent } from './all-material-requests.component';

describe('AllMaterialRequestsComponent', () => {
  let component: AllMaterialRequestsComponent;
  let fixture: ComponentFixture<AllMaterialRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMaterialRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaterialRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
