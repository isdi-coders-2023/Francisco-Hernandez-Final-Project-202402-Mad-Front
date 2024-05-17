import { Component, inject } from '@angular/core';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../models/projects.models/projects.models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h2>categorías</h2>
      <div class="grid-container">
        @for (item of getKeys(categoryMapping); track $index) {
        <div
          [routerLink]="['/projectList']"
          routerLinkActive="router-link-active"
          class="grid-item"
          (click)="filter(getValue(item), item)"
          (keyup.enter)="filter(getValue(item), item)"
          tabindex="0"
        >
          <a> {{ item }}</a>
        </div>
        }
      </div>
    </section>
  `,
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  state = inject(ProjectStateService);
  router = inject(Router);

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
  filter(category: Category, title: string) {
    this.state.filterProject(category, title);
  }

  getKeys(record: Record<string, string>) {
    return Object.keys(record);
  }

  getValue(key: string) {
    return this.categoryMapping[key].valueOf() as Category;
  }
}
