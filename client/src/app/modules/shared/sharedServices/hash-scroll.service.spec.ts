import { TestBed } from '@angular/core/testing';

import { HashScrollService } from './hash-scroll.service';

describe('HashScrollService', () => {
  let service: HashScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
