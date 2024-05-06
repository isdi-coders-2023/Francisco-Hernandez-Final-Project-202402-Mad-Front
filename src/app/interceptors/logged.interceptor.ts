import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersStateService } from '../services/users.services/users.state/users.state.service';

export const loggedInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(UsersStateService);
  const { loginState, token } = stateService.state;

  if (loginState !== 'logged') {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
