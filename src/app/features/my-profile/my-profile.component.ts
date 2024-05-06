import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  template: `
    <app-header><app-menu /></app-header>
    <app-footer />
  `,
  styleUrl: './my-profile.component.css',
  imports: [HeaderComponent, MenuComponent, FooterComponent],
})
export default class MyProfileComponent {}
