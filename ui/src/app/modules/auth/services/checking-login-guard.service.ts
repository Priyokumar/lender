import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckingLoginGuardService  implements CanActivate{

constructor(
  private authService: AuthService,
  private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(route.component === LoginComponent){
      if(this.authService.getUserDataFromLocalStorage()){
        this.router.navigate(["/dashboard"]);
        this.authService.sendLoginSignal(true);
      }else{
        this.authService.sendLoginSignal(false);
      }
    } else{
      if(!this.authService.getUserDataFromLocalStorage()){
        this.authService.sendLoginSignal(false);
        this.router.navigate(["/login"]);
      } else{
        this.authService.sendLoginSignal(true);
      }
    }
    return true;
  }

}
