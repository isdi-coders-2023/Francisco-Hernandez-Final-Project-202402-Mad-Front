import { Component, OnInit, inject } from '@angular/core';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { Project } from '../../models/projects.models/projects.models';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User } from '../../models/users.models/users.models';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-details',
  standalone: true,
  template: `
    <app-header> <app-menu /></app-header>
    <section>
      <h3>{{ project.title }}</h3>
      <ul>
        <li>{{ project.content }}</li>
        <li><img [src]="project.archive" alt="project" width="150" /></li>
        <li>{{ project.author?.name }}</li>
        @if(currentUser.id === project.author?.id ){
        <div>
          <img
            (click)="updateProject(project)"
            (keyup)="updateProject(project)"
            tabindex="0"
            src="../../../assets/icon-edit-user.png"
            alt="edit-icon"
            width="35"
          />
          <img
            (click)="delete(project.id)"
            (keyup)="delete(project.id)"
            tabindex="0"
            src="../../../assets/icon-delete-user.png"
            alt="delete-icon"
            width="30"
          />
        </div>
        }
      </ul>

      <a (click)="comeBack()" (keyup)="comeBack()" tabindex="0">volver</a>
    </section>
  `,
  styleUrl: './details.component.css',
  imports: [HeaderComponent, MenuComponent],
})
export default class DetailsComponent implements OnInit {
  state = inject(ProjectStateService);
  userState = inject(UsersStateService);
  router = inject(Router);
  currentUser!: User;
  project!: Project;
  ngOnInit() {
    this.state.getSelectedCard().subscribe((card) => {
      if (card) {
        this.project = card;
      }
    });

    this.currentUser = this.userState.state.currentUser as User;
  }
  comeBack() {
    this.router.navigate(['/projectList']);
  }

  updateProject(project: Project) {
    this.state.setCurrentProject(project);
    this.router.navigate(['/updateProject']);
  }

  delete(id: string) {
    this.state.deleteProject(id);
    this.router.navigate(['/myProjects']);
  }
}
