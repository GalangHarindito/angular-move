import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = `An Unknown Error Occurred`;
    let errorObj = {};
    
    if (error.error instanceof ErrorEvent) {
      // Handle client-side error
      errorObj = {
        message: error.error.message,
        status: error.status,
      };
    } else {
      // Handle server-side error
      errorObj = {
        message: error.error.message || errorMessage,
        errorText: error.statusText,
        status: error.status,
      };
    }

    if(error.status === 403){
      cookieService.deleteAll('/', 'localhost')
    }

    // Return the error object as an observable
    return throwError(() => errorObj);
  }));
};
