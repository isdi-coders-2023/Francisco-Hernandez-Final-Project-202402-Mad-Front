import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <h1><img src="../../../favicon.ico" alt="logo-canline" /> {{ title }}</h1>
      <ng-content></ng-content>
    </header>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Canline';
}
