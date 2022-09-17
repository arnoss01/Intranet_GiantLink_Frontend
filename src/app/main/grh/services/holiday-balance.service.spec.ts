import { TestBed } from '@angular/core/testing';

import { HolidayBalanceService } from './holiday-balance.service';

describe('HolidayBalanceService', () => {
  let service: HolidayBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
