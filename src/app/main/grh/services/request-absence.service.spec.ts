import { TestBed } from '@angular/core/testing';

import { RequestAbsenceService } from './request-absence.service';

describe('RequestAbsenceService', () => {
  let service: RequestAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
