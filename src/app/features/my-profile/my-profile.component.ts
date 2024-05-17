import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User } from '../../models/users.models/users.models';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  template: `
    <app-header><app-menu /></app-header>
    <section>
      <h2>mi perfil</h2>
      <div>
        <h3>datos personales</h3>
        <p>{{ personalData.email }}</p>
        <p>{{ personalData.name }}</p>
        <img [src]="personalData.imageUrl" alt="image-personal" width="100  " />
      </div>
      <div>
        <h3>mis proyectos</h3>
      </div>
      <app-delete-button />
    </section>
  `,
  styleUrl: './my-profile.component.css',
  imports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DeleteButtonComponent,
  ],
})
export default class MyProfileComponent {
  state = inject(UsersStateService);
  personalData!: User;

  updatePersonalData() {
    this.personalData = this.state.state.currentUser as User;
  }
}
