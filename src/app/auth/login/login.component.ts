import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import { first } from 'rxjs/operators/first';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  selector: 'app-login',
})

export class LoginComponent implements OnInit {
  model: any = {username: '', password: ''};
  loading = false;
  infoMessage = '';
  loginUnsuccessfulError = {error: false, message: ''};


  constructor(private router: Router,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if(params.registered =='true') {
          this.infoMessage = 'Registration successful. You may log in.';
        }
      });
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.login(loginForm);
    }
  }

  login(loginForm: NgForm) {
    this.loading = true;
    this.authService
      .login(this.model.username, this.model.password)
      .pipe(first())
      .subscribe(
        (authUser: {token: string, username: string}) => {
          this.authService.setAuthToken(authUser.token);
          this.authService.storeUsername(authUser.username);
          this.router.navigate(['/app/tweets']);
        },
        (error) => {
          this.handleUnsuccessfulLogin(loginForm, error);
        }
      );
  }

  private handleUnsuccessfulLogin(loginForm: NgForm, error: any) {
    this.loginUnsuccessfulError = {error: true, message: 'Invalid credentials. ' + error.error.message};
    loginForm.resetForm();
    this.cd.detectChanges();
  }

  isFormSubmittedWithInvalidUsername(loginForm: NgForm): boolean {
    const usernameFormControl = loginForm.form.controls['username'];
    return loginForm.submitted && usernameFormControl && !usernameFormControl.valid;
  }

  isFormSubmittedWithInvalidPassword(loginForm: NgForm): boolean {
    const passwordFormControl = loginForm.form.controls['password'];
    return loginForm.submitted && passwordFormControl && !passwordFormControl.valid;
  }
}
