import { TestBed } from '@angular/core/testing';

import { RequestDepartureService } from './request-departure.service';

describe('RequestDepartureService', () => {
  let service: RequestDepartureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDepartureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
