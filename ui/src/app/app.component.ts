import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './modules/auth/services/auth.service';
import { allSideNavs, ISideNav } from './modules/shared/model/shared.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sideNavs: ISideNav[] = allSideNavs;

  constructor(
    public authService: AuthService
  ) {
  
  }

  logout() {
    this.authService.logout();
  }

}
