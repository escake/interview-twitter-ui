import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators/first';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: any = {username: '', fullName: '', password: ''};
  registrationUnsuccessfulError = {error: false, message: ''}; 

  constructor(private router: Router,
              private cd: ChangeDetectorRef,
              private authService: AuthService) { 
    }

  onSubmit(registrationForm: NgForm): void {
    if (registrationForm.valid) {
      this.register(registrationForm);
    }
  }

  register(registrationForm: NgForm) {
    this.authService
      .register(this.model.username, this.model.fullName, this.model.password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/login'], {queryParams: { registered: 'true' } });
        },
        (error) => {
          this.handleUnsuccessfulRegistration(registrationForm, error);
        }
      );
  }

  private handleUnsuccessfulRegistration(registrationForm: NgForm, error: any) {
    this.registrationUnsuccessfulError = {error: true, message: 'Registration unsuccessful. ' + error.error.message};
    registrationForm.resetForm();
    this.cd.detectChanges();
  }

  isFormSubmittedWithInvalidUsername(registrationForm: NgForm): boolean {
    const usernameFormControl = registrationForm.form.controls['username'];
    return registrationForm.submitted && usernameFormControl && !usernameFormControl.valid;
  }

  isFormSubmittedWithInvalidFullName(registrationForm: NgForm): boolean {
    const fullNameFormControl = registrationForm.form.controls['fullName'];
    return registrationForm.submitted && fullNameFormControl && !fullNameFormControl.valid;
  }

  isFormSubmittedWithInvalidPassword(registrationForm: NgForm): boolean {
    const passwordFormControl = registrationForm.form.controls['password'];
    return registrationForm.submitted && passwordFormControl && !passwordFormControl.valid;
  }

}
