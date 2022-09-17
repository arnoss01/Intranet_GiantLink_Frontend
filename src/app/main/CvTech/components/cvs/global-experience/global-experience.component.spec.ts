import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalExperienceComponent } from './global-experience.component';

describe('GlobalExperienceComponent', () => {
  let component: GlobalExperienceComponent;
  let fixture: ComponentFixture<GlobalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
