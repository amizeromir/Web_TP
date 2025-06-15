import { provideHttpClient } from '@angular/common/http';
import {PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading} from "@angular/router";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {IonicRouteStrategy} from "@ionic/angular";
import {provideIonicAngular} from "@ionic/angular/standalone";
import {routes} from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
