import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RepoUsersService } from '../../services/users.services/repo.users/repo.users.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  template: `
    <app-header />
    <section>
      <h2>Bienvenido estudiante</h2>
      <p>
        Si quieres compartir tus apuntes y ayudar a los demas, create un usuario
        y disfruta aprendiendo lo que te gusta
      </p>
      <form
        [formGroup]="userFg"
        (ngSubmit)="!isUserWithAccount ? isCreatingAccount() : isLoggingIn()"
      >
        @if (!isUserWithAccount) {
        <label>
          <input
            type="text"
            placeholder="nombre de usuario*"
            formControlName="name"
        /></label>
        }

        <label>
          <input type="email" placeholder="email*" formControlName="email"
        /></label>
        <label>
          <input
            type="password"
            placeholder="contraseña*"
            formControlName="password"
        /></label>
        @if(!isUserWithAccount){
        <label
          for="login"
          (click)="display()"
          (keyup.enter)="display()"
          tabindex="0"
        >
          <p id="login">tengo cuenta</p></label
        >
        <button type="submit">crear</button>
        } @else {
        <label
          for="create"
          (click)="display()"
          (keyup.enter)="display()"
          tabindex="0"
        >
          <p id="login">crear cuenta</p></label
        >
        <button type="submit">acceder</button>
        }
      </form>
    </section>
  `,
  styleUrl: './create-user.component.css',
  imports: [ReactiveFormsModule, HeaderComponent],
})
export class CreateUserComponent {
  isUserWithAccount: boolean = true;
  userFg: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  repo = inject(RepoUsersService);
  state = inject(UsersStateService);
  router = inject(Router);

  display() {
    this.isUserWithAccount = !this.isUserWithAccount;
  }

  isLoggingIn() {
    const userData = { ...this.userFg.value };
    this.repo.login(userData).subscribe({
      next: ({ token }) => {
        this.state.setLogin(token);
      },
      error: () => {
        this.router.navigate(['/error']);
        this.state.setLoginState('idle');
      },
    });
  }

  isCreatingAccount() {
    const userData = {
      imageUrl: '../../../assets/pic-perfil.png',
      ...this.userFg.value,
    };

    this.repo.createUser(userData).subscribe({
      next: () => {
        this.isUserWithAccount = !this.isUserWithAccount;
        this.userFg.reset();
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  getName() {
    this.state.getUsername(this.userFg.value.name);
  }
}
