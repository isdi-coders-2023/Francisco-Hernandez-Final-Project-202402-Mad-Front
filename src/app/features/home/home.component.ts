import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import {
  State,
  UsersStateService,
} from '../../services/users.services/users.state/users.state.service';
import ErrorComponent from '../error/error.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    @switch (state.loginState) { @case ('idle') {
    <app-create-user />
    } @case ('logged') {
    <app-header> <app-menu /> </app-header>
    <app-categories />
    } @case ('error') { <app-error /> } }
  `,
  styleUrl: './home.component.css',
  imports: [
    HeaderComponent,
    MenuComponent,
    CategoriesComponent,
    CreateUserComponent,
    ErrorComponent,
    FooterComponent,
  ],
})
export default class HomeComponent {
  stateService = inject(UsersStateService);
  state!: State;
  constructor() {
    this.getStatus();
  }
  getStatus() {
    this.stateService.getState().subscribe((state) => {
      this.state = state;
    });
  }
}
