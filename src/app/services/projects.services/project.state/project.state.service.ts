import { Injectable, inject } from '@angular/core';
import { ProjectRepoService } from '../projects.repo/project.repo.service';
import { Category } from '../../../models/projects.models/projects.models';
import { UsersStateService } from '../../users.services/users.state/users.state.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectStateService {
  private repoProjects = inject(ProjectRepoService);
  private userState = inject(UsersStateService);

  loadProjects(category: Category) {
    this.repoProjects
      .getProjectByCategory(category)
      .subscribe((project) => project);
  }
}
