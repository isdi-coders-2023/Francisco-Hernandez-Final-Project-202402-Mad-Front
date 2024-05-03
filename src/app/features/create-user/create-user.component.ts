import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <h2>Bienvenido estudiante</h2>
      <p>
        Si quieres compartir tus apuntes y ayudar a los demas, hazte un usuario
        y disfruta aprendiendo lo que te gusta
      </p>
      <form [formGroup]="createUserFb">
        <label> <input type="text" placeholder="nombre de usuario" /></label>
        <label> <input type="email" placeholder="email" /></label>
        <label> <input type="password" placeholder="contraseña" /></label>
        <button type="submit" [disabled]="createUserFb.invalid">Enviar</button>
      </form>
    </section>
  `,
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  createUserFb: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
}
