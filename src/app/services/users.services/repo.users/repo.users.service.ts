import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  User,
  UserCreateDto,
  UserLogin,
} from '../../../models/users.models/users.models';
import { Observable } from 'rxjs';
import { Project } from '../../../models/projects.models/projects.models';

@Injectable({
  providedIn: 'root',
})
export class RepoUsersService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/users';

  login(dataLogin: UserLogin) {
    const data = {
      email: dataLogin.email,
      password: dataLogin.password,
    };
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }

  getById(id: string) {
    return this.httpClient.get(this.url + '/' + id);
  }

  createUser(data: UserCreateDto) {
    const url = this.url + '/register';
    return this.httpClient.post(url, data) as Observable<User>;
  }

  updateUser(id: string, data: FormData) {
    const url = this.url + '/' + id;
    return this.httpClient.patch<Partial<User>>(url, data);
  }

  delete(id: string) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  saveProject(userId: string, projectId: string) {
    return this.httpClient.post<Partial<Project>>(
      this.url + '/' + userId + '/save-project/' + projectId,
      {}
    );
  }

  removeSavedProject(userId: string, projectId: string) {
    return this.httpClient.delete<Partial<Project>>(
      this.url + '/' + userId + '/remove-saved-project/' + projectId,
      {}
    );
  }

  getSavedProjects(userId: string) {
    return this.httpClient.get<Project[]>(
      this.url + '/' + userId + '/saved-projects'
    );
  }
}
