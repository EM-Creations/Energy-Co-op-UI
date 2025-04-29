import {TestBed} from '@angular/core/testing';

import {GraigFathaSiteDataService} from './graig-fatha-site-data.service';
import {provideHttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('GraigFathaSiteDataService', () => {
  let service: GraigFathaSiteDataService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(GraigFathaSiteDataService);
    httpTesting = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get when getTodayGenerationWatts is called', async ()  => {
    const generation$ = service.getTodayGenerationWatts();
    const generationPromise = firstValueFrom(generation$);

    const req = httpTesting.expectOne(() => true);
    expect(req.request.method).toBe('GET');

    req.flush(100);
    expect(await generationPromise).toEqual(100);

    httpTesting.verify();
  });
});
