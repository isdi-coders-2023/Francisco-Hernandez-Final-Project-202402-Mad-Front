import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Router } from '@angular/router';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import {
  Category,
  Project,
} from '../../models/projects.models/projects.models';

@Component({
  selector: 'app-update-project',
  standalone: true,
  template: `
    <app-header> <app-menu /> </app-header>
    <section>
      <h2>editar</h2>
      <form [formGroup]="updateProjectForm">
        <label>
          <input type="text" formControlName="title" placeholder="título"
        /></label>
        <label>
          <input
            class="textbox"
            type="text"
            id="text"
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
        <button type="submit" (click)="updateProject()">editar</button>
      </form>
      <a (click)="comeBack()" (keyup)="comeBack()" tabindex="0">volver</a>
    </section>
  `,
  styleUrl: './update-project.component.css',
  imports: [ReactiveFormsModule, HeaderComponent, MenuComponent],
})
export default class UpdateProjectComponent implements OnInit {
  @ViewChild('archive') archive!: ElementRef;
  state = inject(ProjectStateService);
  userState = inject(UsersStateService);
  router = inject(Router);
  updateProjectForm!: FormGroup;

  currentProject!: Project;

  ngOnInit() {
    this.state.currentProject$.subscribe((data) => {
      this.currentProject = data;
    });
    this.initializeForm();
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

  initializeForm() {
    this.updateProjectForm = new FormGroup({
      title: new FormControl(this.currentProject.title),
      content: new FormControl(this.currentProject.content),
      category: new FormControl('categoria'),
      archive: new FormControl(this.currentProject.archive),
    });
  }

  updateProject() {
    const currentTitle = this.updateProjectForm.value.title;
    const currentContent = this.updateProjectForm.value.content;
    const selectedCategory = this.updateProjectForm.value.category;
    const trueCategory = this.categoryMapping[selectedCategory];
    const updateProject = new FormData();

    updateProject.append('id', this.currentProject.id);
    updateProject.append('title', currentTitle);
    updateProject.append('content', currentContent);
    updateProject.append('archive', this.updateProjectForm.value.archive);
    updateProject.append('category', trueCategory);

    this.state.updateProject(this.currentProject.id, updateProject);
    this.router.navigate(['/myProjects']);
  }
  addFile() {
    const htmlElement: HTMLInputElement = this.archive.nativeElement;
    const file = htmlElement.files![0];
    this.updateProjectForm.patchValue({ archive: file });
  }

  comeBack() {
    this.router.navigate(['/myProjects']);
  }
}
