import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `<app-header />
    <section>
      <h2>Error</h2>
      <div>
        <img src="../../../assets/error.svg" alt="error-picture" width="300" />
        <p>emoz sido engañados</p>
      </div>
      <a [routerLink]="['/home']">volver</a>
    </section> `,
  styleUrl: './error.component.css',
  imports: [HeaderComponent, RouterLink],
})
export default class ErrorComponent {}
