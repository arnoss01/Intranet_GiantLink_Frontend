import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningTypeComponent } from './warning-type.component';

describe('WarningTypeComponent', () => {
  let component: WarningTypeComponent;
  let fixture: ComponentFixture<WarningTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
