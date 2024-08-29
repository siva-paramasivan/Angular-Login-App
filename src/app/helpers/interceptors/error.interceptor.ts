import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  const user = authService.currentUserValue;

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Auto logout if 401 response returned from API
        router.navigate(['/login']);
        if (user) toastr.error('Token Expired');
      } else if (err.status === 403) {
        // Redirect to forbidden page if 403 response returned
        console.error(err);
      } else if (err.status === 500) {
        //Notification error message if internal server error returned
        toastr.error(err.statusText);
      }
      else {
        // Handle other HTTP errors
        console.error(err);
      }
      // Return the error to the caller
      return throwError(() => err);
    })
  );
};
