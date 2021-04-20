import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.url.includes('login')) {
            return next.handle(req);
        }
        const authToken = `Bearer ${this.authService.getAuthToken()}`;
        const authReq = req.clone({ setHeaders: { Authorization: authToken } });

        return next.handle(authReq).pipe(
           
            catchError((err: any) => {
               
                if (err instanceof HttpErrorResponse) {

                    if(err.error.status === 401){
                        this.router.navigate(["/login"])
                    }
                }
                return of(err);
            }));
    }
}

