import { TestBed } from '@angular/core/testing';

import { InversorService } from './inversor.service';

describe('InversorService', () => {
  let service: InversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InversorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
