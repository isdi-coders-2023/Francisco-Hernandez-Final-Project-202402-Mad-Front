import { Component, OnInit, inject } from '@angular/core';
import {
  Category,
  Project,
} from '../../models/projects.models/projects.models';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { ProjectRepoService } from '../../services/projects.services/projects.repo/project.repo.service';
import { RouterLink } from '@angular/router';

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
      <a [routerLink]="['/home']" routerLinkActive="router-link-active"
        >volver</a
      >
    </section>`,
  styleUrl: './project-list.component.css',
  imports: [ProjectCardComponent, HeaderComponent, MenuComponent, RouterLink],
})
export default class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  repo = inject(ProjectRepoService);
  state = inject(ProjectStateService);
  title: string = '';
  category!: Category;

  constructor() {
    this.state.titleCategory$.subscribe((data) => {
      this.title = data;
    });
  }
  ngOnInit(): void {
    this.state.cagetory$.subscribe((data) => {
      if (!data) return;
      this.category = data;
      this.getProjectsByCategory();
    });
  }

  getProjectsByCategory() {
    console.log('List GetCat');
    this.repo.getProjectByCategory(this.category).subscribe({
      next: (data) => {
        this.projects = data;
      },
    });
  }
}
