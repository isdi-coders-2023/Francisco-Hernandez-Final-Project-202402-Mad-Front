import { Component, Input } from '@angular/core';
import { Project } from '../../models/projects.models/projects.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  template: `<div>
    <h3>{{ project?.title }}</h3>
    <img [src]="project?.archive" alt=" archive project" width="100" />
  </div> `,
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
