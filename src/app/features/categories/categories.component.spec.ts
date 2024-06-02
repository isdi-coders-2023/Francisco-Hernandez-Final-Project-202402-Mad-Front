import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { ProjectStateService } from '../../services/projects.services/project.state/project.state.service';
import { Category } from '../../models/projects.models/projects.models';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockProjectStateService: jasmine.SpyObj<ProjectStateService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockProjectStateService = jasmine.createSpyObj('ProjectStateService', [
      'filterProject',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CategoriesComponent],
      providers: [
        { provide: ProjectStateService, useValue: mockProjectStateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterProject when filter is called', () => {
    const category = 'geography';
    const title = 'Geography';

    component.filter(category as Category, title);

    expect(mockProjectStateService.filterProject).toHaveBeenCalledWith(
      category,
      title
    );
  });

  it('should navigate to /projectList when filter is called', () => {
    const category = 'geography';
    const title = 'Geography';

    component.filter(category as Category, title);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/projectList']);
  });

  it('should return keys of categoryMapping when getKeys is called', () => {
    const keys = component.getKeys(component.categoryMapping);

    expect(keys).toEqual(Object.keys(component.categoryMapping));
  });

  it('should return category value when getValue is called', () => {
    const key = 'geografía';
    const value = component.getValue(key);

    expect(value).toEqual(component.categoryMapping[key]);
  });
});
