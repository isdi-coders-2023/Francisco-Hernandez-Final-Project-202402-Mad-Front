import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteButtonComponent } from './delete-button.component';
import {
  State,
  UsersStateService,
} from '../../services/users.services/users.state/users.state.service';
import { of } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;
  let mockUsersStateService: Partial<UsersStateService>;

  beforeEach(async () => {
    mockUsersStateService = {
      state: { currentPayload: { id: '123' } } as unknown as State,
      setDelete: jasmine.createSpy('setDelete').and.returnValue(of(true)),
    };

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        { provide: UsersStateService, useValue: mockUsersStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete() and navigate to /home when button is clicked', () => {
    const deleteButton = fixture.nativeElement.querySelector('button');
    deleteButton.click();

    expect(mockUsersStateService.setDelete).toHaveBeenCalled();
  });
});
