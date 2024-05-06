import { TestBed } from '@angular/core/testing';

import { UsersStateService } from './users.state.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('UsersStateService', () => {
  let service: UsersStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())],
    });
    service = TestBed.inject(UsersStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
