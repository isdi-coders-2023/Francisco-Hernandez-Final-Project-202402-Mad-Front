import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserLogin } from '../../../models/users.models/users.models';

@Injectable({
  providedIn: 'root',
})
export class RepoUsersService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/users';

  login(_data: UserLogin) {
    const data = {
      name: _data.username,
      password: _data.password,
    };
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }
  createUser(data: FormData) {
    const url = this.url + '/register';
    return this.httpClient.post(url, data);
  }
}
