import { TestBed } from '@angular/core/testing';

import { PrijavaGuardService } from './prijava-guard.service';

describe('PrijavaGuardService', () => {
  let service: PrijavaGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrijavaGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
