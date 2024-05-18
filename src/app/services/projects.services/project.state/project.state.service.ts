import { Injectable, inject } from '@angular/core';
import { ProjectRepoService } from '../projects.repo/project.repo.service';
import {
  Category,
  Project,
} from '../../../models/projects.models/projects.models';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UsersStateService } from '../../users.services/users.state/users.state.service';

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
  public myProjects$ = this.myProjects.asObservable();
  private userState = inject(UsersStateService);

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

  loadMyProjects() {
    this.repoProjects.getProject().subscribe({
      next: (data) => {
        const result = data.filter((item) => {
          return this.userState.state.currentPayload!.id === item.author.id;
        });
        this.myProjects.next(result);
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
        const newMyProjects = [...this.myProjects.value, data];
        this.myProjects.next(newMyProjects);
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }

  deleteProject(id: string) {
    this.repoProjects.deleteProject(id).subscribe({
      next: (data) => {
        const newMyProjects = this.myProjects.value.filter((item) => {
          return item.id !== data.id;
        });
        this.myProjects.next(newMyProjects);
      },
    });
  }

  getCategory() {
    return this.titleCategory.value;
  }
}
