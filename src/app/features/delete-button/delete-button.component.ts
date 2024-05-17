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
    <button type="button" (click)="deleteUser()">borrar cuenta</button>
  </div>`,
  styleUrl: './delete-button.component.css',
})
export class DeleteButtonComponent {
  repo = inject(RepoUsersService);
  state = inject(UsersStateService);
  router = inject(Router);

  deleteUser() {
    const currentUser = this.state.state.currentPayload as Payload;
    if (!currentUser.id) {
      throw new Error();
    }

    const userId = currentUser.id;
    this.repo.delete(userId).subscribe({
      next: () => {
        this.state.setLogout();
        this.router.navigate(['']);
      },
      error: () => {
        this.router.navigate(['/error']);
      },
    });
  }
}
