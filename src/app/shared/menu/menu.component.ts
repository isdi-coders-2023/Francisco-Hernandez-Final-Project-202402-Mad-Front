import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
        @for (item of menuOptions; track $index) {
        <li>
          <a [routerLink]="['/home']" routerLinkActive="router-link-active">{{
            item
          }}</a>
        </li>
        }
      </ul>
    </nav>
    }
  `,
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuOptions = ['mi perfil', 'mis proyectos', 'mis favoritos'];
  showMenu: boolean = false;

  displayMenu(display = true) {
    return (this.showMenu = display);
  }
}
