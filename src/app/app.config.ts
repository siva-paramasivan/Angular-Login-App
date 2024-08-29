import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './helpers/interceptors/error.interceptor';
import { jwtInterceptor } from './helpers/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations(), // required animations providers
    provideToastr(),
    provideHttpClient(withInterceptors([
      errorInterceptor,jwtInterceptor
    ]))
  ]
};
