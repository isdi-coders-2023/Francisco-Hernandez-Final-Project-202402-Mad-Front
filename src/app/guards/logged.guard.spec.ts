import { TestBed } from '@angular/core/testing';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { loggedGuard } from './logged.guard';
import { UsersStateService } from '../services/users.services/users.state/users.state.service';

describe('loggedGuard', () => {
  const mockUsersStateService = {
    state: { loginState: 'logged' },
  };
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UsersStateService, useValue: mockUsersStateService },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow activation when user is logged in', () => {
    const fakeRoute = {} as ActivatedRouteSnapshot;
    const fakeState = {} as RouterStateSnapshot;
    const canActivate = executeGuard(fakeRoute, fakeState);
    expect(canActivate).toBe(true);
  });

  it('should prevent activation when user is not logged in', () => {
    mockUsersStateService.state.loginState = 'not-logged';
    const fakeRoute = {} as ActivatedRouteSnapshot;
    const fakeState = {} as RouterStateSnapshot;
    const canActivate = executeGuard(fakeRoute, fakeState);
    expect(canActivate).toBe(false);
  });
});
