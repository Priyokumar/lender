import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './modules/auth/services/auth.service';
import { IUser } from './modules/security/security.model';
import { allSideNavs, ISideNav } from './modules/shared/model/shared.model';
import { LoaderService } from './modules/shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: IUser;
  sideNavs: ISideNav[] = allSideNavs;

  constructor(
    public authService: AuthService,
    public loaderService: LoaderService
  ) {
    this.user = this.authService.getUserDataFromLocalStorage();
    this.authService.recieveLoginSignal().subscribe(data=>{
      if(data){
        this.user = this.authService.getUserDataFromLocalStorage();
      }
    })
  }

  logout() {
    this.authService.logout();
  }

}
