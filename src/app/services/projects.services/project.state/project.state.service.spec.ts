import { TestBed } from '@angular/core/testing';

import { ProjectStateService } from './project.state.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('ProjectStateService', () => {
  let service: ProjectStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())],
    });
    service = TestBed.inject(ProjectStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
