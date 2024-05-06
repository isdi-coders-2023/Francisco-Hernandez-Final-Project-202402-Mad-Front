import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [provideHttpClient(withFetch())],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu when displayMenu(true) is called', () => {
    component.displayMenu(true);
    expect(component.showMenu).toBe(true);
  });

  it('should hide menu when displayMenu(false) is called', () => {
    component.displayMenu(false);
    expect(component.showMenu).toBe(false);
  });
});
