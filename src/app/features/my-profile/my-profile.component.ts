import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User, UserCreateDto } from '../../models/users.models/users.models';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  template: `
    <app-header><app-menu /></app-header>
    <section>
      <h2>mi perfil</h2>
      <div>
        <h3>datos personales</h3>
        @if (!isEditing) {
        <ul>
          <li>
            <img
              [src]="personalData?.imageUrl"
              alt="image-personal"
              width="100"
            />
          </li>
          <li>{{ personalData?.name }}</li>
          <li>{{ personalData?.email }}</li>
        </ul>
        <img
          (click)="displayForm()"
          (keyup)="displayForm()"
          tabindex="0"
          src="../../../assets/icon-edit.png"
          alt="icon-edit"
          width="40px"
        />
        <app-delete-button></app-delete-button>
        } @else {
        <app-update-user (changesSaved)="onChangesSaved()" />}
      </div>
      <div (click)="useRouter()" (keyup)="useRouter()" tabindex="0">
        <h3>mis proyectos</h3>
        @if(projectState.myProjects$ | async; as projects){ @for (item of
        projects; track item.id) {
        <p>{{ item.title }}</p>
        }}
      </div>
    </section>
  `,
  styleUrl: './my-profile.component.css',
  imports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DeleteButtonComponent,
    RouterLink,
    AsyncPipe,
    UpdateUserComponent,
  ],
})
export default class MyProfileComponent implements OnInit {
  state = inject(UsersStateService);
  projectState = inject(ProjectStateService);
  personalData!: User;
  isEditing = false;
  editableData!: Partial<UserCreateDto>;
  router = inject(Router);

  ngOnInit() {
    this.personalData = this.state.state.currentUser as User;
    this.projectState.loadMyProjects();
  }

  displayForm() {
    this.isEditing = true;
  }

  onChangesSaved() {
    this.isEditing = false;
    this.state.getState().subscribe((data) => {
      this.personalData = data.currentUser as User;
    });
  }

  useRouter() {
    this.router.navigate(['/myProjects']);
  }
}
