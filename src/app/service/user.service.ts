import {inject, Injectable} from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = inject(AuthService);
  private user: User | null | undefined = null;

  /**
   * Returns an Observable that emits the current Auth0 access token.
   * Always retrieves the latest token, avoiding race conditions.
   */
  getAccessTokenSilently$(): Observable<string> {
    return this.auth.getAccessTokenSilently();
  }

  /**
   * Returns an Observable that emits the decoded access token (JWT claims).
   * Decodes the token only when available, and emits null on error.
   */
  getDecodedAccessToken$(): Observable<any | null> {
    return this.getAccessTokenSilently$().pipe(
      map(token => {
        try {
          return jwtDecode(token);
        } catch (e) {
          console.error('Error decoding access token:', e);
          return null;
        }
      })
    );
  }

  retrieveUser(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(user => {
        this.user = user;
      })
    }
  }
}
