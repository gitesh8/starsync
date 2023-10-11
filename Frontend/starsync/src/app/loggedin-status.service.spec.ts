import { TestBed } from '@angular/core/testing';

import { LoggedinStatusService } from './loggedin-status.service';

describe('LoggedinStatusService', () => {
  let service: LoggedinStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedinStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
