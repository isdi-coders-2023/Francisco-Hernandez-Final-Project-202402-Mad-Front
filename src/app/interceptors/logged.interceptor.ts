import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersStateService } from '../services/users.services/users.state/users.state.service';

export const loggedInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(UsersStateService);

  if (!stateService || !stateService.state || !stateService.state.loginState) {
    return next(req);
  }
  const { loginState, token } = stateService.state;

  if (loginState !== 'logged') {
    return next(req);
  }

  console.log('authInterceptor', token);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
