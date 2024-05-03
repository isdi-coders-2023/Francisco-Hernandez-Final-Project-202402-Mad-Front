import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    @if (!loginState) {
    <app-header />
    <app-create-user /> }@else { <app-header> <app-menu /> </app-header>
    <app-categories />
    }<app-footer />
  `,
  styleUrl: './home.component.css',
  imports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    CategoriesComponent,
    CreateUserComponent,
  ],
})
export default class HomeComponent {
  loginState!: true;
}
