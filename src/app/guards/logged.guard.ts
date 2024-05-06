/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {
  State,
  UsersStateService,
} from '../services/users.services/users.state/users.state.service';

export const loggedGuard: CanActivateFn = (_route, _stateRoute) => {
  const stateSrv = inject(UsersStateService);
  const state: State = stateSrv.state;

  if (state.loginState !== 'logged') {
    return false;
  }

  return true;
};
