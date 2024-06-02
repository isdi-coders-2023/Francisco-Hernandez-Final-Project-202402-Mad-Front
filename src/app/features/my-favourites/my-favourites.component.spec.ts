import { ComponentFixture, TestBed } from '@angular/core/testing';

import MyFavouritesComponent from './my-favourites.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('MyFavouritesComponent', () => {
  let component: MyFavouritesComponent;
  let fixture: ComponentFixture<MyFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFavouritesComponent],
      providers: [provideHttpClient(withFetch())],
    }).compileComponents();

    fixture = TestBed.createComponent(MyFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
