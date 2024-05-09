import { Component, inject } from '@angular/core';
import { RepoUsersService } from '../../services/users.services/repo.users/repo.users.service';
import {
  Payload,
  UsersStateService,
} from '../../services/users.services/users.state/users.state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [],
  template: ` <div>
    <button type="button" (click)="delete()">borrar cuenta</button>
  </div>`,
  styleUrl: './delete-button.component.css',
})
export class DeleteButtonComponent {
  repo = inject(RepoUsersService);
  state = inject(UsersStateService);
  router!: Router;

  delete() {
    const currentUser = this.state.state.currentPayload as Payload;
    console.log(currentUser);
    if (!currentUser.id) {
      throw new Error();
    }

    const userId = currentUser.id;
    console.log(userId);
    this.state.setDelete(userId);
  }
}
