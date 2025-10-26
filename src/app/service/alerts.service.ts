import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  http = inject(HttpClient);
  auth = inject(AuthService);

  getAlerts(site: string): Observable<any> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(`${environment.api.baseURL}/admin/alerts/${site}`, { headers });
      })
    );
  }
}
