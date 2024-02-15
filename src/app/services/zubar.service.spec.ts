import { TestBed } from '@angular/core/testing';

import { ZubarService } from './zubar.service';

describe('ZubarService', () => {
  let service: ZubarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZubarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
