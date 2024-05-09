import { Component, inject } from '@angular/core';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { Category } from '../../models/projects.models/projects.models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  template: `
    <section>
      <h2>categorías</h2>
      <section>
        <div class="grid-container">
          @for (item of categories; track $index) {
          <div class="grid-item">
            <a href="#">{{ item }}</a>
          </div>
          }
        </div>
      </section>
    </section>
  `,
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  state = inject(ProjectStateService);
  categories = [
    'geografía',
    'anatomía',
    'matemáticas',
    'arte',
    'literatura',
    'física',
    'biología',
    'historia',
    'química',
    'música',
    'economía',
    'filosofía',
    'derecho',
    'idiomas',
    'informática',
    'geología',
    'derecho',
    'psicología',
    'contabilidad',
    'astronomía',
    'hostelería',
    'sociología',
    'sexología',
    'ingenieria',
  ];

  filter(category: Category) {
    this.state.loadProjects(category);
  }
}
