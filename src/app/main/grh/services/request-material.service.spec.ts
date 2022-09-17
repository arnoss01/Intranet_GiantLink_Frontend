import { TestBed } from '@angular/core/testing';

import { RequestMaterialService } from './request-material.service';

describe('RequestMaterialService', () => {
  let service: RequestMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
