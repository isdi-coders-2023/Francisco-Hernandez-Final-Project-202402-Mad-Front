import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProjectRepoService } from './project.repo.service';
import { environment } from '../../../../environments/environment.development';
import {
  Category,
  Project,
  ProjectUpdateDto,
} from '../../../models/projects.models/projects.models';

describe('ProjectRepoService', () => {
  let service: ProjectRepoService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.apiUrl + '/projects';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectRepoService],
    });
    service = TestBed.inject(ProjectRepoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get projects', () => {
    const mockProjects: Project[] = [
      { id: '1', title: 'Project 1' } as Project,
      { id: '2', title: 'Project 2' } as Project,
    ];

    service.getProject().subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpTestingController.expectOne(apiUrl + '/');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should get projects by category', () => {
    const mockProjects: Project[] = [
      { id: '1', title: 'Project 1' } as Project,
      { id: '2', title: 'Project 2' } as Project,
    ];
    const category: Category = 'art';

    service.getProjectByCategory(category).subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpTestingController.expectOne(apiUrl + '/' + category);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should create a project', () => {
    const mockProject: Project = { id: '1', title: 'Project 1' } as Project;
    const formData = new FormData();
    formData.append('name', 'Project 1');

    service.createProject(formData).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne(apiUrl + '/');
    expect(req.request.method).toBe('POST');
    req.flush(mockProject);
  });

  it('should update a project', () => {
    const mockProject: Project = {
      id: '1',
      title: 'Updated Project',
    } as Project;
    const projectUpdateDto: ProjectUpdateDto = { title: 'Updated Project' };

    service
      .updateProject(mockProject.id, projectUpdateDto)
      .subscribe((project) => {
        expect(project).toEqual(mockProject);
      });

    const req = httpTestingController.expectOne(apiUrl + '/' + mockProject.id);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProject);
  });

  it('should delete a project', () => {
    const mockProject: Project = {
      id: '1',
      title: 'Project to delete',
    } as Project;

    service.deleteProject(mockProject.id).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne(apiUrl + '/' + mockProject.id);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProject);
  });
});
