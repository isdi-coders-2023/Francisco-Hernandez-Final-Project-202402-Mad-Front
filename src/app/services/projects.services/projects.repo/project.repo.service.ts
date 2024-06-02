import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  Category,
  Project,
} from '../../../models/projects.models/projects.models';
import { User } from '../../../models/users.models/users.models';

@Injectable({
  providedIn: 'root',
})
export class ProjectRepoService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/projects';

  getProject() {
    return this.httpClient.get<Project[]>(this.url + '/');
  }

  getProjectByCategory(category: Category) {
    return this.httpClient.get<Project[]>(this.url + '/' + category);
  }

  createProject(data: FormData) {
    const url = this.url + '/';
    return this.httpClient.post<Project>(url, data);
  }

  updateProject(id: string, data: FormData) {
    const url = this.url + '/';
    return this.httpClient.patch<Project>(url + id, data);
  }

  deleteProject(id: string) {
    const url = this.url + '/';
    return this.httpClient.delete<Project>(url + id);
  }

  getUsersWhoSavedProject(projectId: string) {
    const url = `${this.url}/${projectId}/saved-by-users`;
    return this.httpClient.get<User[]>(url);
  }
}
