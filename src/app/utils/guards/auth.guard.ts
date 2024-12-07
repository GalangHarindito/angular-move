import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { debug } from 'console';
import { CookieService } from 'ngx-cookie-service';

const checkAuthentication = (): boolean => {
  // Dependency injection for services
  const cookieService = inject(CookieService);
  const router = inject(Router);

  // Check for token in cookies
  const token = cookieService.get('token');
  
  // Improved token validation
  const hasValidToken = !!token && token.trim() !== '';

  if (!hasValidToken) {
    // Redirect to signin if no valid token
    router.navigate(['/signin'], {
      // Optional: Pass current route as queryParam for redirect after login
      queryParams: { 
        returnUrl: router.url 
      }
    });
    return false;
  }

  // Optional: Add additional token validation logic
  try {
    // Example: Basic JWT token validation (if using JWT)
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      // Perform additional checks like expiration if needed
      return true;
    }
    
    // If token format is invalid
    router.navigate(['/signin']);
    return false;
  } catch (error) {
    console.error('Token validation error', error);
    router.navigate(['/signin']);
    return false;
  }
};

export const authGuard: CanActivateFn = (route, state) => {
  return checkAuthentication();
};

export const authGuardChildren: CanActivateChildFn = (route, state) => {
  return checkAuthentication();
};