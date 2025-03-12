import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {InputSwitchModule} from 'primeng/inputswitch'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InputSwitchModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularProject';

  isDarkMode = false;
  toggleLightDark() {
    const linkElement = document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (linkElement.href.includes('light')) {
      linkElement.href = 'theme-dark.css';
      this.isDarkMode = true;
    } else {
      linkElement.href = 'theme-light.css';
      this.isDarkMode = false;
    }
  }
}
