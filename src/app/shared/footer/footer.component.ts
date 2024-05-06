import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <nav>
        <ul>
          <li>
            <a href="#" target="_blank"
              ><img src="../../../assets/logo-youtube.png" alt="Youtube logo"
            /></a>
          </li>
          <li>
            <a href="#" target="_blank"
              ><img
                src="../../../assets/logo-instagram.png"
                alt="Instagram logo"
            /></a>
          </li>
          <li>
            <a href="#" target="_blank"
              ><img src="../../../assets/logo-twitter.png" alt="Twitter logo"
            /></a>
          </li>
          <li>
            <a href="#" target="_blank"
              ><img src="../../../assets/logo-contact.png" alt="Contact logo"
            /></a>
          </li>
        </ul>
      </nav>
      <address>© Copyright Canline, 2024</address>
    </footer>
  `,
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
