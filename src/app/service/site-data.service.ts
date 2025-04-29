import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VensysDataResponse} from '../model/VensysDataResponse';

@Injectable({
  providedIn: 'root'
})
export abstract class SiteDataService {
  abstract getTodayGenerationWatts(): Observable<VensysDataResponse>;
}
