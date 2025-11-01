import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SiteInfo} from '../model/site-info';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {EnergySaving} from '../model/EnergySaving';
import {UserService} from './user.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  http = inject(HttpClient);
  userService = inject(UserService);

  private readonly baseURL: string;
  private static defaultEnergySaving: EnergySaving = {
    amount: 0,
    currency: 'GBP',
    savingsRate: 0,
    from: new Date(),
    to: new Date()
  };

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

  getHistoricalSavings(site: SiteInfo, from: Date, to: Date): Observable<Set<EnergySaving>> {
    const fromStr = moment(from).format('YYYY-MM-DD');
    const toStr = moment(to).format('YYYY-MM-DD');

    switch (site.name) {
      case "Graig Fatha":
        return this.userService.getAccessTokenSilently$().pipe(
          switchMap(token => {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            });
            return this.http.get<Set<EnergySaving>>(`${this.baseURL}/graigFatha/member/savings/${fromStr}/${toStr}`, {headers});
          })
        );
      default: {
        const response = new Set<EnergySaving>();
        response.add(MemberService.defaultEnergySaving);
        return of(response);
      }
    }
  }

  generateTaxDocument(site: SiteInfo | undefined, from: Date, to: Date): Observable<Blob> {
    const fromStr = moment(from).format('YYYY-MM-DD');
    const toStr = moment(to).format('YYYY-MM-DD');

    console.log("Generating tax document for site:", site, "from:", fromStr, "to:", toStr);

    if (site) {
      switch (site.name) {
        case "Graig Fatha":
          return this.userService.getAccessTokenSilently$().pipe(
            switchMap(token => {
              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/pdf'
              });
              return this.http.get(`${this.baseURL}/graigFatha/member/tax-document/${fromStr}/${toStr}`, {
                headers,
                responseType: 'blob',
                observe: 'response'
              }).pipe(
                switchMap(response => {
                  return of(new Blob([response.body!], { type: 'application/pdf' }));
                })
              );
            })
          );
        default: {
          return of(new Blob());
        }
      }
    } else {
      return of(new Blob());
    }
  }
}
