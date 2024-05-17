import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteButtonComponent } from './delete-button.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteButtonComponent],
      providers: [provideHttpClient(withFetch())],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
