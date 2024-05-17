import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ProjectRepoService } from '../../services/projects.services/projects.repo/project.repo.service';
import {
  Payload,
  UsersStateService,
} from '../../services/users.services/users.state/users.state.service';
import { Project } from '../../models/projects.models/projects.models';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  template: `
    <app-header> <app-menu /> </app-header>
    <section>
      <h2>mis proyectos</h2>
      <a
        [routerLink]="['/createProjects']"
        routerLinkActive="router-link-active"
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
export default class MyProjectsComponent implements OnInit {
  state = inject(UsersStateService);
  stateProject = inject(ProjectStateService);
  repo = inject(ProjectRepoService);
  myProjects: Project[] = [];

  ngOnInit() {
    this.loadMyProjects();
  }
  loadMyProjects() {
    const currentUser = this.state.state.currentPayload as Payload;
    if (!currentUser.email) {
      throw new Error();
    }
    this.repo.getProject().subscribe({
      next: (data) => {
        this.myProjects = data.filter((item) => {
          return item.author.email === currentUser.email;
        });
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      },
    });
  }

  delete(id: string) {
    this.stateProject.deleteProject(id);
  }
}
