import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';

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
          <input type="text" formControlName="content" placeholder="resumen"
        /></label>
        <label>
          <select formControlName="category">
            <option value="" disabled selected>categoria</option>
            <option value="geografia">Geografía</option>
            <option value="anatomia">Anatomía</option>
            <option value="matematicas">Matemáticas</option>
            <option value="arte">Arte</option>
            <option value="literatura">Literatura</option>
            <option value="fisica">Física</option>
            <option value="biologia">Biología</option>
            <option value="historia">Historia</option>
            <option value="quimica">Química</option>
            <option value="musica">Música</option>
            <option value="economia">Economía</option>
            <option value="filosofia">Filosofía</option>
            <option value="derecho">Derecho</option>
            <option value="idiomas">Idiomas</option>
            <option value="informatica">Informática</option>
            <option value="geologia">Geología</option>
            <option value="psicologia">Psicología</option>
            <option value="contabilidad">Contabilidad</option>
            <option value="astronomia">Astronomía</option>
            <option value="hosteleria">Hostelería</option>
            <option value="sociologia">Sociología</option>
            <option value="sexologia">Sexología</option>
            <option value="ingenieria">Ingeniería</option>
          </select>
        </label>
        <label>
          <input
            type="file"
            formControlName="archive"
            placeholder="subir archivo"
          /><button type="button">subir archivo</button></label
        >
        <button type="submit">añadir</button>
      </form>
      <a [routerLink]="['/myProjects']" routerLinkActive="router-link-active"
        >volver</a
      >
    </section>
    <app-footer />
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
  createProjectForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    archive: new FormControl('', Validators.required),
  });
}
