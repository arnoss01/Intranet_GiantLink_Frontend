import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyentityComponent } from './add-companyentity.component';

describe('AddCompanyentityComponent', () => {
  let component: AddCompanyentityComponent;
  let fixture: ComponentFixture<AddCompanyentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
