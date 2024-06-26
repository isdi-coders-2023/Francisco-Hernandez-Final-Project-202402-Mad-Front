import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <img
      src="../../../assets/burguer-menu.png"
      alt="burger menu"
      (click)="displayMenu()"
      (dblclick)="displayMenu(false)"
      (keyup.enter)="displayMenu()"
      tabindex="0"
      width="30"
    />
    @if (showMenu) {
    <nav>
      <ul>
        <li>
          <a [routerLink]="['/home']">categorias</a>
        </li>
        <li>
          <a [routerLink]="['/myProfile']">mi perfil</a>
        </li>
        <li>
          <a [routerLink]="['/myProjects']">mis proyectos</a>
        </li>
        <li>
          <a [routerLink]="['/myFavourites']">mis favoritos</a>
        </li>
        <li>
          <button (click)="logout()" [routerLink]="['/home']">salir</button>
        </li>
      </ul>
    </nav>
    }
  `,
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  router!: RouterLink;
  showMenu: boolean = false;
  state = inject(UsersStateService);

  displayMenu(display = true) {
    return (this.showMenu = display);
  }
  logout() {
    this.state.setLogout();
  }
}
