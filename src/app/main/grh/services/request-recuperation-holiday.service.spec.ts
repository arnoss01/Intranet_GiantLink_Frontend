import { TestBed } from '@angular/core/testing';

import { RequestRecuperationHolidayService } from './request-recuperation-holiday.service';

describe('RequestRecuperationHolidayService', () => {
  let service: RequestRecuperationHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRecuperationHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
