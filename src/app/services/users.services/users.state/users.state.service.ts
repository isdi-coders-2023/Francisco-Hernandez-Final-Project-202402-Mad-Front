import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Project } from '../../../models/projects.models/projects.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepoUsersService } from '../repo.users/repo.users.service';
import { Router } from '@angular/router';

export type LoginState = 'idle' | 'logged' | 'error';

export type Payload = {
  id: string;
  email: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currentPayload: Payload | null;
  currentUser: unknown | null;
  projects: Project[];
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currentPayload: null,
  currentUser: null,
  projects: [],
};

@Injectable({
  providedIn: 'root',
})
export class UsersStateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private repoUsers = inject(RepoUsersService);
  private currentUsername = new BehaviorSubject<string>('');
  public currentUsername$ = this.currentUsername.asObservable();
  router = inject(Router);

  constructor() {}
  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  get state(): State {
    return this.state$.value;
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currentPayload = jwtDecode(token) as Payload;
    localStorage.setItem('frontend', token);
    this.repoUsers.getById(currentPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token: token,
        currentPayload: currentPayload,
        currentUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('frontend');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currentPayload: null,
    });
  }

  getUsername(username: string) {
    this.currentUsername.next(username);
  }

  updateUser(id: string, data: FormData) {
    if (!id) return;

    this.repoUsers.updateUser(id, data).subscribe({
      next: (item) => {
        const newState = { ...this.state, currentUser: item };
        this.state$.next(newState);
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  deleteUser(id: string) {
    this.repoUsers.delete(id).subscribe({
      next: () => {
        this.setLogout();
        this.router.navigate(['']);
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }
}
