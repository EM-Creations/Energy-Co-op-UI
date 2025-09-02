import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withNoXsrfProtection} from '@angular/common/http';
import {provideAuth0} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withNoXsrfProtection()
    ),
    provideAuth0({
      domain: `${environment.auth0.domain}`,
      clientId: `${environment.auth0.clientId}`,
      authorizationParams: {
        audience: environment.auth0.audience,
        scope: environment.auth0.scope,
        redirect_uri: environment.auth0.redirectUri
      },
      errorPath: '/error'
    }),
    provideCharts(withDefaultRegisterables())
  ]
};
