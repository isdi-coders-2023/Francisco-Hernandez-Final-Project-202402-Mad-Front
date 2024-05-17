import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import {
  Payload,
  UsersStateService,
} from '../../services/users.services/users.state/users.state.service';
import { Category } from '../../models/projects.models/projects.models';

@Component({
  selector: 'app-create-project',
  standalone: true,
  template: `
    <app-header> <app-menu /> </app-header>
    <section>
      <h2>añadir proyecto</h2>
      <form [formGroup]="createProjectForm">
        <label>
          <input type="text" formControlName="title" placeholder="título"
        /></label>
        <label>
          <input
            class="textbox"
            type="text"
            id="text"
            placeholder="300 caracteres"
            maxlength="300"
            formControlName="content"
            placeholder="resumen, 300 caracteres"
        /></label>
        <label>
          <select formControlName="category">
            <option disabled selected>categoria</option>
            @for (item of getKeys(categoryMapping); track $index) {

            <option [value]="item">{{ item }}</option>
            }
          </select>
        </label>
        <label class="archive">
          <input type="file" #archive (change)="addFile()"
        /></label>
        <button type="submit" (click)="addProject()">añadir</button>
      </form>
      <a [routerLink]="['/myProjects']" routerLinkActive="router-link-active"
        >volver</a
      >
    </section>
  `,
  styleUrl: './create-project.component.css',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
})
export default class CreateProjectComponent {
  projectState = inject(ProjectStateService);
  router = inject(Router);
  state = inject(UsersStateService);
  createProjectForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('categoria', Validators.required),
    archive: new FormControl([null]),
  });
  project: string | null = null;
  @ViewChild('archive') archive!: ElementRef;

  addProject() {
    const currentUser = this.state.state.currentPayload as Payload;
    const selectedCategory = this.createProjectForm.value.category;
    const trueCategory = this.categoryMapping[selectedCategory];
    const newProject = new FormData();
    const titleToLowerCase = this.createProjectForm.value.title.toLowerCase();
    const contentToLowerCase =
      this.createProjectForm.value.content.toLowerCase();

    newProject.append('title', titleToLowerCase);
    newProject.append('content', contentToLowerCase);
    newProject.append('category', trueCategory);
    newProject.append('archive', this.createProjectForm.value.archive);
    newProject.append('authorId', currentUser.id);

    if (!newProject) {
      throw new Error();
    }
    this.projectState.createProject(newProject);
    this.router.navigate(['/myProjects']);
  }

  addFile() {
    const htmlElement: HTMLInputElement = this.archive.nativeElement;
    const file = htmlElement.files![0];
    this.createProjectForm.patchValue({ archive: file });
  }

  categoryMapping: Record<string, Category> = {
    geografía: 'geography',
    anatomía: 'anatomy',
    matemáticas: 'mathematics',
    arte: 'art',
    literatura: 'literature',
    física: 'physics',
    biología: 'biology',
    historia: 'history',
    química: 'chemistry',
    música: 'music',
    economía: 'economics',
    filosofía: 'philosophy',
    derecho: 'law',
    idiomas: 'languages',
    informática: 'computerScience',
    geología: 'geology',
    psicología: 'psychology',
    contabilidad: 'accounting',
    astronomía: 'astronomy',
    hostelería: 'hospitality',
    sociología: 'sociology',
    sexología: 'sexology',
    ingenieria: 'engineering',
    arquitectura: 'architecture',
  };

  getKeys(record: Record<string, string>) {
    return Object.keys(record);
  }
}
