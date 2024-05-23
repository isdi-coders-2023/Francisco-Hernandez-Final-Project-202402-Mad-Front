import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersStateService } from './services/users.services/users.state/users.state.service';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet />
    <app-footer />
  `,
  styles: ``,
  imports: [RouterOutlet, FooterComponent],
})
export class AppComponent {
  title = 'Canline';
  state = inject(UsersStateService);
  constructor() {
    const tokenValid = localStorage.getItem('frontend');
    if (!tokenValid) {
      return;
    }
    console.log(this.state.state.savedProjects);
    this.state.setLogin(tokenValid);
  }
}
