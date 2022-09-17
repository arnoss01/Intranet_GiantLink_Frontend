import { TestBed } from '@angular/core/testing';

import { EntityDepartmentService } from './entity-department.service';

describe('EntityDepartmentService', () => {
  let service: EntityDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
