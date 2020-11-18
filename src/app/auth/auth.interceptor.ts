import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //injecting AuthService here to avoid circular dependency issue:
    // https://github.com/angular/angular/issues/18224
    const authService = this.injector.get(AuthService); 
    req = req.clone({
      setHeaders: {
        "X-Requested-With": 'XMLHttpRequest',
        "Authorization": 'Basic ' + authService.getAuthToken()
      }
    });
    return next.handle(req).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
