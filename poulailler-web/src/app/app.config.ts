import { provideHttpClient } from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

let routes;
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // nécessaire pour HttpClient
    provideRouter(routes)
  ]
};
