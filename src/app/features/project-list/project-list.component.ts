import { Component, OnDestroy, inject } from '@angular/core';
import {
  Category,
  Project,
} from '../../models/projects.models/projects.models';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { ProjectRepoService } from '../../services/projects.services/projects.repo/project.repo.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  template: ` <app-header> <app-menu /> </app-header>
    <section>
      <h2>{{ title }}</h2>
      <ul>
        @for (item of projects; track item.id) {

        <li><app-project-card [project]="item" /></li>

        }
      </ul>
      <div>
        @if(projects.length === 0){
        <a
          (click)="addProject()"
          (keyup)="addProject()"
          tabindex="0"
          class="add-project"
        >
          añadir proyecto</a
        >
        }
        <a (click)="comeBack()" (keyup)="comeBack()" tabindex="0">volver</a>
      </div>
    </section>`,
  styleUrl: './project-list.component.css',
  imports: [ProjectCardComponent, HeaderComponent, MenuComponent],
})
export default class ProjectListComponent implements OnDestroy {
  projects: Project[] = [];
  repo = inject(ProjectRepoService);
  state = inject(ProjectStateService);
  router = inject(Router);
  title: string = '';
  category!: Category;
  subscription: Subscription;
  constructor() {
    this.state.titleCategory$.subscribe((data) => {
      this.title = data;
    });
    this.subscription = this.state.cagetory$.subscribe((data) => {
      if (!data) return;
      this.category = data;
      this.getProjectsByCategory();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProjectsByCategory() {
    this.repo.getProjectByCategory(this.category).subscribe({
      next: (data) => {
        this.projects = data;
      },
    });
  }

  comeBack() {
    this.router.navigate(['/home']);
  }
  addProject() {
    this.router.navigate(['/createProjects']);
  }
}
