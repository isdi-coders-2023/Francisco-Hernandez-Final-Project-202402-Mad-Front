import { TestBed } from '@angular/core/testing';
import { UsersStateService } from './users.state.service';
import { RepoUsersService } from '../repo.users/repo.users.service';
import { Observable, of } from 'rxjs';

describe('UsersStateService', () => {
  let service: UsersStateService;
  let repoUsersSpy: jasmine.SpyObj<RepoUsersService>;

  beforeEach(() => {
    repoUsersSpy = jasmine.createSpyObj('RepoUsersService', [
      'login',
      'getById',
      'updateUser',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [
        UsersStateService,
        { provide: RepoUsersService, useValue: repoUsersSpy },
      ],
    });
    service = TestBed.inject(UsersStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set login state', () => {
    service.setLoginState('logged');
    expect(service.state.loginState).toEqual('logged');
  });

  it('should set logout', () => {
    spyOn(localStorage, 'removeItem');
    service.setLogout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('frontend');
    expect(service.state.loginState).toEqual('idle');
    expect(service.state.token).toBeNull();
    expect(service.state.currentPayload).toBeNull();
    expect(service.state.currentUser).toBeNull();
  });

  it('should return user state observable', () => {
    const state$ = service.getState();
    expect(state$).toEqual(jasmine.any(Object));
  });

  it('should update user and state', () => {
    const id = 'exampleId';
    const formData = new FormData();
    const updatedUser = { id, name: 'Jane Doe', email: 'jane@example.com' };
    repoUsersSpy.updateUser.and.returnValue(of(updatedUser));

    service.updateUser(id, formData);

    expect(repoUsersSpy.updateUser).toHaveBeenCalledOnceWith(id, formData);
    expect(service.state.currentUser).toEqual(updatedUser);
  });

  it('should delete user and logout', () => {
    const id = 'exampleId';
    spyOn(localStorage, 'removeItem');
    repoUsersSpy.delete.and.returnValue(
      of(undefined as unknown as Observable<unknown>)
    );

    service.deleteUser(id);

    expect(localStorage.removeItem).toHaveBeenCalledWith('frontend');
    expect(repoUsersSpy.delete).toHaveBeenCalledOnceWith(id);
    expect(service.state.loginState).toEqual('idle');
    expect(service.state.token).toBeNull();
    expect(service.state.currentPayload).toBeNull();
    expect(service.state.currentUser).toBeNull();
  });
});
