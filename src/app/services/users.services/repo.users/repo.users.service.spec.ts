import { TestBed } from '@angular/core/testing';
import { RepoUsersService } from './repo.users.service';
import { provideHttpClient } from '@angular/common/http';

describe('RepoUsersService', () => {
  let service: RepoUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(RepoUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
