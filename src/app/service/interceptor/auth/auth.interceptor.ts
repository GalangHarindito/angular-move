import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const cookieToken = cookieService.get('s')

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${cookieToken}`
    }
  })
 
  return next(authReq)
};
