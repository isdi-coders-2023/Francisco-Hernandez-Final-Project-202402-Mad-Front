import { Component, OnInit, inject } from '@angular/core';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { Project } from '../../models/projects.models/projects.models';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User } from '../../models/users.models/users.models';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-details',
  standalone: true,
  template: `
    <app-header> <app-menu /></app-header>
    <section>
      <h3>{{ project.title }}</h3>
      <ul>
        <li>{{ project.content }}</li>
        <li><img [src]="project.archive" alt="project" width="150" /></li>
        @if(currentUser?.id === project.author.id ){
        <div>
          <img src="../../../assets//icon-edit.png" alt="edit-icon" />
          <img src="../../../assets//icon-delete.png" alt="delete-icon" />
        </div>
        }
      </ul>

      <a (click)="comeBack()" (keyup)="comeBack()" tabindex="0">volver</a>
    </section>
  `,
  styleUrl: './details.component.css',
  imports: [HeaderComponent, MenuComponent],
})
export default class DetailsComponent implements OnInit {
  state = inject(ProjectStateService);
  userState = inject(UsersStateService);
  router = inject(Router);
  currentUser!: User;
  project!: Project;
  ngOnInit() {
    this.state.getSelectedCard().subscribe((card) => {
      if (!card) return;
      this.project = card;
    });

    this.currentUser = this.userState.state.currentUser as User;
  }
  comeBack() {
    this.router.navigate(['/projectList']);
  }
}
