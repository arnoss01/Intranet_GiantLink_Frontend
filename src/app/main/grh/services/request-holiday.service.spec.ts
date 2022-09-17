import { TestBed } from "@angular/core/testing";

import { RequestHolidayService } from "./request-holiday.service";

describe("HolidayService", () => {
  let service: RequestHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHolidayService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
