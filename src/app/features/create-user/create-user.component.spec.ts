import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RepoUsersService } from '../../services/users.services/repo.users/repo.users.service';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let mockRepoUserService: Partial<RepoUsersService>;
  let mockUsersStateService: Partial<UsersStateService>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockRepoUserService = {
      login: jasmine
        .createSpy('login')
        .and.returnValue(of({ token: 'mockToken' })),
      createUser: jasmine.createSpy('createUser').and.returnValue(of({})),
    };

    mockUsersStateService = {
      setLogin: jasmine.createSpy('setLogin'),
      setLoginState: jasmine.createSpy('setLoginState'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    await TestBed.configureTestingModule({
      imports: [CreateUserComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(withFetch()),
        { provide: RepoUsersService, useValue: mockRepoUserService },
        { provide: UsersStateService, useValue: mockUsersStateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isUserWithAccount set to false', () => {
    expect(component.isUserWithAccount).toBe(false);
  });

  it('should toggle isUserWithAccount when display() is called', () => {
    component.display();
    expect(component.isUserWithAccount).toBe(true);
    component.display();
    expect(component.isUserWithAccount).toBe(false);
  });

  it('should call repo.createUser and setLoginState when isCreatingAccount() is called', () => {
    component.userFg.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });
    component.isCreatingAccount();
    expect(mockRepoUserService.createUser).toHaveBeenCalled();
    expect(mockUsersStateService.setLoginState).toHaveBeenCalledWith('logged');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
