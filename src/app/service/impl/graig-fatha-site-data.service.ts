import {Injectable} from '@angular/core';
import {SiteDataService} from '../site-data.service';

@Injectable({
  providedIn: 'root'
})
export class GraigFathaSiteDataService implements SiteDataService {
  getYesterdayGenerationWatts(): number {
        return 10;
    }
}
