import { Component, OnInit } from '@angular/core';
import { ThemeControllerService } from 'src/app/shared/services/theme-controller.service';

@Component({
  selector: 'app-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  styleUrls: ['./theme-toggler.component.css'],
})
export class ThemeTogglerComponent implements OnInit {
  currentTheme = '';

  constructor(private themeController: ThemeControllerService) {}

  ngOnInit() {
    this.currentTheme =
      this.themeController.currentTheme === 'mode-light'
        ? 'sun-fill'
        : 'moon-fill';
  }

  onToggleTheme(theme: 'mode-dark' | 'mode-light') {
    this.currentTheme = theme === 'mode-light' ? 'sun-fill' : 'moon-fill';
    this.themeController.changeTheme(theme);
  }
}
