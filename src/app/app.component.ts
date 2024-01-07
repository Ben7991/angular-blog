import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeControllerService } from './shared/services/theme-controller.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private themeController: ThemeControllerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.themeController.initializeTheme();
    this.userService.autoLogin();
  }
}
