import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SavingsRate} from '../model/SavingsRate';
import {SavingsRateUpdate} from '../model/SavingsRateUpdate';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  http = inject(HttpClient);
  userService = inject(UserService);

  private readonly baseURL: string;

  constructor() {
    this.baseURL = environment.api.baseURL + '/admin';
  }

  setSavingsRate(payload: SavingsRateUpdate): Observable<SavingsRate> {
    return this.userService.getAccessTokenSilently$().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        return this.http.post<SavingsRate>(`${this.baseURL}/savings-rate`, payload, {headers});
      })
    );
  }
}
