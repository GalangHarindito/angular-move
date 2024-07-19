import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = `An Unknown Error Occured`
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error :${error.error.message}`
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`
    }
    // alert(errorMessage)
    return throwError(() => error.error)
  }));
};
