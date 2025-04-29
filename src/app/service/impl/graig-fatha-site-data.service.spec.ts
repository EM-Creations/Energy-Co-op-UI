import {TestBed} from '@angular/core/testing';

import {GraigFathaSiteDataService} from './graig-fatha-site-data.service';

describe('GraigFathaSiteDataService', () => {
  let service: GraigFathaSiteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraigFathaSiteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 10 for yesterday\'s generation in watts', () => {
    const generation = service.getYesterdayGenerationWatts();
    expect(generation).toBe(10);
  });
});
