import { TestBed } from '@angular/core/testing';

import { ScrollNavService } from './scroll-nav.service';

describe('ScrollNavService', () => {
  let service: ScrollNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
