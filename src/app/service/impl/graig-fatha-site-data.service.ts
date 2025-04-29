import {inject, Injectable} from '@angular/core';
import {SiteDataService} from '../site-data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {VensysDataResponse} from '../../model/VensysDataResponse';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraigFathaSiteDataService implements SiteDataService {
  private baseURL = environment.graigFatha.baseURL;
  private tid = environment.graigFatha.tid;
  private apiKey = environment.graigFatha.apiKey;
  private headerDict = {
    'ApiKey': this.apiKey,
    'TID': this.tid
  };
  private requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };

  private http = inject(HttpClient);

  getTodayGenerationWatts(): Observable<VensysDataResponse> {
    const url = `${this.baseURL}/Customer/MeanData/Show/EnergyYield`;

    return this.http.get<VensysDataResponse>(url, this.requestOptions);
  }
}
