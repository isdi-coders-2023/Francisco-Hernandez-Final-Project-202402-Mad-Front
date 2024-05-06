import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import {
  State,
  UsersStateService,
} from '../../services/users.services/users.state/users.state.service';
import { ErrorComponent } from '../error/error.component';

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

    <app-footer />
  `,
  styleUrl: './home.component.css',
  imports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    CategoriesComponent,
    CreateUserComponent,
    ErrorComponent,
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
