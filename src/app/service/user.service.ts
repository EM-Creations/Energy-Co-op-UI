import {inject, Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {AuthService, User} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = inject(AuthService);
  private accessToken: object | null = null;
  private user: User | null | undefined = null;

  retrieveUser(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(user => {
        this.user = user;
      })
    }
  }

  retrieveAccessToken(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.isAuthenticated$.subscribe(() => {
        this.auth.getAccessTokenSilently().subscribe(token => {
          try {
            const decodedToken = jwtDecode(token);
            console.log('Access token:', decodedToken);
            this.accessToken = decodedToken;
          } catch (error) {
            console.log('Error decoding access token:', error);
            this.accessToken = null;
          }
        })
      });
    }
  }

  getAccessToken(): object | null {
    if (!this.accessToken) {
      this.retrieveAccessToken();
    }

    return this.accessToken;
  }

  getUser(): User | null | undefined {
    if (!this.user) {
      this.retrieveUser();
    }
    return this.user;
  }
}
