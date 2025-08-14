import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SiteInfo} from '../model/site-info';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {EnergySaving} from '../model/EnergySaving';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  http = inject(HttpClient);
  userService = inject(UserService);

  private readonly baseURL: string;
  private static defaultEnergySaving: EnergySaving = {amount: 0, currency: 'GBP', from: new Date(), to: new Date()};

  constructor() {
    this.baseURL = environment.api.baseURL;
  }

  getTodaySavings(site: SiteInfo): Observable<EnergySaving> {
    switch (site.name) {
      case "Graig Fatha":
        return this.userService.getAccessTokenSilently$().pipe(
          switchMap(token => {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            });
            return this.http.get<EnergySaving>(`${this.baseURL}/graigFatha/member/todaySavings`, {headers});
          })
        );
      default:
        return of(MemberService.defaultEnergySaving);
    }
  }
}
