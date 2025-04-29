import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class SiteDataService {
  abstract getYesterdayGenerationWatts(): number;
}
