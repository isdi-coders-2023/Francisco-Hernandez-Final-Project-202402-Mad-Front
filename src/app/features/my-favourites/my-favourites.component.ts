import { Component, OnInit, inject } from '@angular/core';
import { Project } from '../../models/projects.models/projects.models';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Router, RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User } from '../../models/users.models/users.models';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';

@Component({
  selector: 'app-my-favourites',
  standalone: true,
  template: `
    <app-header> <app-menu /> </app-header>
    <h2>mis favoritos</h2>
    @if (this.myFavourites.length === 0) {
    <a [routerLink]="['/home']" class="save-projects"
      >guarda aqui tus proyectos favoritos</a
    >
    }@else {
    <ul>
      @for (item of this.myFavourites; track item.id) {
      <li>
        <a (click)="goToDetails(item)" (keyup)="goToDetails(item)" tabindex="0">
          <p>
            {{ item?.title }}
          </p>
          <p>
            {{ item?.content }}
          </p>
        </a>

        <img
          (click)="removeFavourite(currentUser.id, item.id)"
          (keyup)="removeFavourite(currentUser.id, item.id)"
          tabindex="0"
          src="../../../assets/icon-saved.png"
          alt="icon-saved"
        />
      </li>
      }
    </ul>
    }
  `,
  styleUrl: './my-favourites.component.css',
  imports: [HeaderComponent, MenuComponent, ProjectCardComponent, RouterLink],
})
export default class MyFavouritesComponent implements OnInit {
  myFavourites: Project[] = [];
  state = inject(UsersStateService);
  projectState = inject(ProjectStateService);
  router = inject(Router);
  currentUser!: User;
  ngOnInit() {
    this.myFavourites = this.state.state.savedProjects;
    this.currentUser = this.state.state.currentUser as User;
  }
  removeFavourite(userId: string, projectId: string) {
    this.state.removeSavedProject(userId, projectId);
    this.state.getState().subscribe((data) => {
      this.myFavourites = data.savedProjects;
    });
  }

  goToDetails(project: Project) {
    this.projectState.selectCard(project);
    this.router.navigate(['/projectDetails']);
  }
}
