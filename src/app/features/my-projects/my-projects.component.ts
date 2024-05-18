import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { Project } from '../../models/projects.models/projects.models';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  template: `
    <app-header> <app-menu /> </app-header>
    <section>
      <h2>mis proyectos</h2>
      <a (click)="createProject()" (keyup)="createProject()" tabindex="0"
        >añadir</a
      >
      <ul>
        @for (item of myProjects; track item.id) {

        <li>
          <p>
            {{ item.title }}
          </p>
          <p>
            {{ item.content }}
          </p>
        </li>
        <button
          type="button"
          (click)="delete(item.id)"
          [routerLink]="['/myProjects']"
          routerLinkActive="router-link-active"
        >
          borrar
        </button>
        }
      </ul>
    </section>
  `,
  styleUrl: './my-projects.component.css',
  imports: [HeaderComponent, MenuComponent, FooterComponent, RouterLink],
})
export default class MyProjectsComponent {
  state = inject(UsersStateService);
  stateProject = inject(ProjectStateService);
  router = inject(Router);
  myProjects: Project[] = [];

  constructor() {
    this.stateProject.myProjects$.subscribe((data) => {
      this.myProjects = data;
    });
    this.stateProject.loadMyProjects();
  }
  loadMyProjects() {
    this.stateProject.loadMyProjects();
  }

  delete(id: string) {
    this.stateProject.deleteProject(id);
  }

  createProject() {
    this.router.navigate(['/createProjects']);
  }
}
