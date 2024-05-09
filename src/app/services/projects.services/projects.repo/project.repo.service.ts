import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  Category,
  ProjectCreateDto,
  ProjectUpdateDto,
} from '../../../models/projects.models/projects.models';

@Injectable({
  providedIn: 'root',
})
export class ProjectRepoService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/projects';

  getProject() {
    return this.httpClient.get(this.url + '/');
  }

  getProjectByCategory(category: Category) {
    return this.httpClient.get(this.url + '/' + category);
  }

  createProject(data: ProjectCreateDto) {
    const url = this.url + '/';
    return this.httpClient.post(url, data);
  }

  updateProject(id: string, data: ProjectUpdateDto) {
    const url = this.url + '/';
    return this.httpClient.patch(url + id, data);
  }

  deleteProject(id: string) {
    const url = this.url + '/';
    return this.httpClient.delete(url + id);
  }
}
