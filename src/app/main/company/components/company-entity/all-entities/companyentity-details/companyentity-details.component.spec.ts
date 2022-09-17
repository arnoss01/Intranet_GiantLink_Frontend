import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyentityDetailsComponent } from './companyentity-details.component';

describe('CompanyentityDetailsComponent', () => {
  let component: CompanyentityDetailsComponent;
  let fixture: ComponentFixture<CompanyentityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyentityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyentityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
