import { TestBed } from '@angular/core/testing';
import { ProjectStateService } from './project.state.service';
import { ProjectRepoService } from '../projects.repo/project.repo.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
  Project,
  Category,
} from '../../../models/projects.models/projects.models';
import { UsersStateService } from '../../users.services/users.state/users.state.service';
import { User } from '../../../models/users.models/users.models';

describe('ProjectStateService', () => {
  let service: ProjectStateService;
  let projectRepoService: jasmine.SpyObj<ProjectRepoService>;
  let router: jasmine.SpyObj<Router>;
  let userStateService: jasmine.SpyObj<UsersStateService>;

  beforeEach(() => {
    const projectRepoServiceSpy = jasmine.createSpyObj('ProjectRepoService', [
      'getProject',
      'createProject',
      'deleteProject',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const userStateServiceSpy = jasmine.createSpyObj('UsersStateService', [], {
      state: { currentPayload: { id: '1' } },
    });

    TestBed.configureTestingModule({
      providers: [
        ProjectStateService,
        { provide: ProjectRepoService, useValue: projectRepoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UsersStateService, useValue: userStateServiceSpy },
      ],
    });

    service = TestBed.inject(ProjectStateService);
    projectRepoService = TestBed.inject(
      ProjectRepoService
    ) as jasmine.SpyObj<ProjectRepoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    userStateService = TestBed.inject(
      UsersStateService
    ) as jasmine.SpyObj<UsersStateService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load projects successfully', () => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        category: 'art',
        author: { id: '1', name: 'author', email: 'author@gmail.com' } as User,
        content: 'Content 1',
        archive: 'foto',
      },
    ];
    projectRepoService.getProject.and.returnValue(of(mockProjects));

    service.loadProjects();

    service.projectState$.subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });
  });

  it('should navigate to error page on load projects failure', () => {
    projectRepoService.getProject.and.returnValue(
      throwError(() => new Error('Error'))
    );

    service.loadProjects();

    expect(router.navigate).toHaveBeenCalledWith(['/error']);
  });

  it("should load user's projects successfully", () => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        category: 'art',
        author: { id: '1', name: 'author', email: 'author@gmail.com' } as User,
        content: 'Content 1',
        archive: 'foto',
      },
      {
        id: '2',
        title: 'Project 2',
        category: 'music',
        author: {
          id: '2',
          name: 'author2',
          email: 'author2@gmail.com',
        } as User,
        content: 'Content 2',
        archive: 'foto2',
      },
    ];
    projectRepoService.getProject.and.returnValue(of(mockProjects));

    service.loadMyProjects();

    service.myProjects$.subscribe((projects) => {
      expect(projects).toEqual([mockProjects[0]]);
    });
  });

  it("should navigate to error page on load user's projects failure", () => {
    projectRepoService.getProject.and.returnValue(
      throwError(() => new Error('Error'))
    );

    service.loadMyProjects();

    expect(router.navigate).toHaveBeenCalledWith(['/error']);
  });

  it('should filter projects by category and title', () => {
    const category: Category = 'art';
    const title = 'New Title';

    service.filterProject(category, title);

    service.titleCategory$.subscribe((title) => {
      expect(title).toBe('New Title');
    });

    service.cagetory$.subscribe((cat) => {
      expect(cat).toBe('art');
    });
  });

  it('should create a project successfully', () => {
    const formData = new FormData();
    const newProject: Project = {
      id: '1',
      title: 'Project 1',
      category: 'art',
      author: { id: '1', name: 'author', email: 'author@gmail.com' } as User,
      content: 'Content 1',
      archive: 'foto',
    };
    projectRepoService.createProject.and.returnValue(of(newProject));

    service.createProject(formData);

    service.myProjects$.subscribe((projects) => {
      expect(projects).toContain(newProject);
    });
  });

  it('should navigate to error page on create project failure', () => {
    const formData = new FormData();
    projectRepoService.createProject.and.returnValue(
      throwError(() => new Error('Error'))
    );

    service.createProject(formData);

    expect(router.navigate).toHaveBeenCalledWith(['/error']);
  });

  it('should delete a project successfully', (done) => {
    const projectId = '1';
    const deletedProject = {
      id: '1',
      title: 'Project 1',
      category: 'art',
      author: { id: '1', name: 'author', email: 'author@gmail.com' } as User,
      content: 'Content 1',
      archive: 'foto',
    } as Project;

    projectRepoService.deleteProject.and.returnValue(of(deletedProject));

    service['myProjects'].next([deletedProject]);

    service.deleteProject(projectId);

    service.myProjects$.subscribe((projects) => {
      expect(projects).not.toContain(deletedProject);
      done();
    });

    expect(projectRepoService.deleteProject).toHaveBeenCalledWith(projectId);
  });

  it('should get current category title', () => {
    const title = 'Current Category Title';
    service.filterProject('art', title);

    expect(service.getCategory()).toBe(title);
  });
});
