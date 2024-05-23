import { Component, OnInit, inject } from '@angular/core';
import { Project } from '../../models/projects.models/projects.models';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Router } from '@angular/router';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';

@Component({
  selector: 'app-my-favourites',
  standalone: true,
  template: `
    <app-header> <app-menu /> </app-header>
    <h2>mis favoritos</h2>
    <ul>
      @for (item of this.myFavourites; track item.id) { >
      <li>{{ item.title }}</li>
      <li>{{ item.archive }}</li>
      <li>{{ item.author.name }}</li>
      }
    </ul>
  `,
  styleUrl: './my-favourites.component.css',
  imports: [HeaderComponent, MenuComponent, ProjectCardComponent],
})
export default class MyFavouritesComponent implements OnInit {
  myFavourites: Project[] = [];
  state = inject(UsersStateService);
  router = inject(Router);
  ngOnInit() {
    this.myFavourites = this.state.state.savedProjects;
  }
}
