import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `<app-header />
    <section>
      <h2>Error</h2>
      <img src="../../../assets/error.svg" alt="error-picture" width="300" />
      <p>emos ido engañados</p>
      <a href="">volver</a>
    </section> `,
  styleUrl: './error.component.css',
  imports: [HeaderComponent],
})
export class ErrorComponent {}
