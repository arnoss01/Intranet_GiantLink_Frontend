import { TestBed } from '@angular/core/testing';

import { GlobalExperienceService } from './global-experience.service';

describe('GlobalExperienceService', () => {
  let service: GlobalExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
