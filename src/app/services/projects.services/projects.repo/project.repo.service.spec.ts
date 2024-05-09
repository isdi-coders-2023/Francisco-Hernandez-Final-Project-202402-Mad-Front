import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProjectRepoService } from './project.repo.service';
import {
  Category,
  ProjectCreateDto,
  ProjectUpdateDto,
} from '../../../models/projects.models/projects.models';

describe('ProjectRepoService', () => {
  let service: ProjectRepoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Usar HttpClientTestingModule para pruebas HTTP
      providers: [ProjectRepoService],
    });

    // Inyectar el servicio y el HttpTestingController
    service = TestBed.inject(ProjectRepoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no hayan solicitudes pendientes
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a project', () => {
    const mockProject = { id: '1', name: 'Project One' };

    service.getProject().subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne(`${service.url}/`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProject);
  });

  it('should retrieve a project by category', () => {
    const category: Category = 'law';
    const mockProject = { id: '1', name: 'Tech Project' };

    service.getProjectByCategory(category).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne(`${service.url}/${category}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProject);
  });

  it('should create a new project', () => {
    const mockProject: ProjectCreateDto = {
      title: 'New Project',
      content: 'project',
      archive: 'archivo',
      authorId: '1',
      category: 'music',
    };

    service.createProject(mockProject).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne(`${service.url}/`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProject);
  });

  it('should update an existing project', () => {
    const projectId = '1';
    const mockUpdate: ProjectUpdateDto = { title: 'Updated Project' };

    service.updateProject(projectId, mockUpdate).subscribe((updatedProject) => {
      expect(updatedProject).toEqual(mockUpdate);
    });

    const req = httpTestingController.expectOne(`${service.url}/${projectId}`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(mockUpdate);
  });

  it('should delete a project', () => {
    const projectId = '1';

    service.deleteProject(projectId).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${service.url}/${projectId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
