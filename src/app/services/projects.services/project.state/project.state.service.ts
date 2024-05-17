import { Injectable, inject } from '@angular/core';
import { ProjectRepoService } from '../projects.repo/project.repo.service';
import {
  Category,
  Project,
} from '../../../models/projects.models/projects.models';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectStateService {
  private projectState = new BehaviorSubject<Project[]>([]);
  public projectState$ = this.projectState.asObservable();
  private repoProjects = inject(ProjectRepoService);
  router = inject(Router);
  private titleCategory = new BehaviorSubject<string>('');
  public titleCategory$ = this.titleCategory.asObservable();
  private category = new BehaviorSubject<Category | null>(null);
  public cagetory$ = this.category.asObservable();
  private myProjects = new BehaviorSubject<Project[]>([]);

  loadProjects() {
    this.repoProjects.getProject().subscribe({
      next: (data) => {
        this.projectState.next(data);
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  filterProject(category: Category, title: string) {
    this.titleCategory.next(title);
    this.category.next(category);
  }

  createProject(data: FormData) {
    this.repoProjects.createProject(data).subscribe({
      next: (data) => {
        const newMyProjects = { ...this.myProjects, data };
        return newMyProjects;
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  deleteProject(id: string) {
    this.repoProjects.deleteProject(id).subscribe({
      next: (data) => {
        const newMyProjects = this.projectState.value.filter((item) => {
          item.id !== data.id;
        });
        return newMyProjects;
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  getMyProjects() {
    return this.myProjects.asObservable();
  }

  updateProjects(projects: Project[]) {
    this.myProjects.next(projects);
  }

  getCategory() {
    return this.titleCategory.value;
  }
}
