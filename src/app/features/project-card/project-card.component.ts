import { Component, Input, OnInit, inject } from '@angular/core';
import { Project } from '../../models/projects.models/projects.models';
import { Router, RouterLink } from '@angular/router';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User } from '../../models/users.models/users.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <a (click)="goToDetails()" (keyup)="goToDetails()" tabindex="0">
        <h3>{{ project?.title }}</h3>
        <img [src]="project?.archive" alt=" archive project" width="100" />
      </a>
      @if (this.isSaved === false) {
      <img
        (click)="addFavourite(currentUser.id, project.id)"
        (keyup)="addFavourite(currentUser.id, project.id)"
        tabindex="0"
        src="../../../assets/icon-not-saved.png"
        alt="icon-not-saved"
      />
      } @else {<img
        (click)="removeFavourite(currentUser.id, project.id)"
        (keyup)="removeFavourite(currentUser.id, project.id)"
        tabindex="0"
        src="../../../assets/icon-saved.png"
        alt="icon-saved"
      />}
    </div>
  `,
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  state = inject(ProjectStateService);
  userState = inject(UsersStateService);
  router = inject(Router);
  currentUser!: User;
  isSaved = false;
  sub!: Subscription;

  ngOnInit() {
    this.currentUser = this.userState.state.currentUser as User;
    this.checkIfSaved();
    this.sub = this.userState.getState().subscribe(() => {
      this.checkIfSaved();
    });
  }

  goToDetails() {
    this.state.selectCard(this.project);
    this.router.navigate(['/projectDetails']);
  }

  addFavourite(userId: string, projectId: string) {
    this.userState.saveProject(userId, projectId);
  }

  removeFavourite(userId: string, projectId: string) {
    this.userState.removeSavedProject(userId, projectId);
  }

  private checkIfSaved() {
    this.isSaved = this.userState.state.savedProjects.some(
      (item) => item.id === this.project.id
    );
  }
}
