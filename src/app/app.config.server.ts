import {provideServerRendering} from '@angular/ssr';
import {ApplicationConfig, mergeApplicationConfig} from '@angular/core';
import {appConfig} from './app.config';
import {AuthService} from '@auth0/auth0-angular';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  ]
};

/**
 * Provide a mock AuthService for SSR mode
 * This is necessary because the AuthService relies on browser-specific APIs
 * that are not available in a server-side rendering (SSR) context.
 * By providing a mock service, we can prevent errors during SSR and allow the application to render
 * without attempting to access browser-specific features.
 */
const provideMockServiceForSSRConfig: ApplicationConfig = {
  providers: [
    {
      provide: AuthService,
      useValue: {},
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig, provideMockServiceForSSRConfig);
