import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  template: ` <app-header> <app-menu /> </app-header>
    <section>
      <h2>mis proyectos</h2>
      <a
        [routerLink]="['/createProjects']"
        routerLinkActive="router-link-active"
        >añadir</a
      >
    </section>
    <app-footer />`,
  styleUrl: './my-projects.component.css',
  imports: [HeaderComponent, MenuComponent, FooterComponent, RouterLink],
})
export default class MyProjectsComponent {}
