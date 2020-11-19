import {Router, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate() {
    if (!this.authService.getCurrentUser()) {
      //not logged in so return true
      return true;
    }

    // logged in so redirect to home page
    this.router.navigate(['/']);
    return false;
  }
}
