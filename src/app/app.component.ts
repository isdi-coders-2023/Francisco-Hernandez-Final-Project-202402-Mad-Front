import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersStateService } from './services/users.services/users.state/users.state.service';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-container">
      <div class="main">
        <router-outlet />
      </div>

      <app-footer />
    </div>
  `,
  styles: `.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .main{
    flex: 1;
  }
}`,
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
    this.state.setLogin(tokenValid);
  }
}
