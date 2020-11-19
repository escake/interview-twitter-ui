import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginContainerComponent} from "./login-container/login-container.component";
import { LoginGuard } from './login.guard';
import { RegisterContainerComponent } from './register-container/register-container.component';

const routes: Routes = [
  {
    path: '',
    component: LoginContainerComponent, canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterContainerComponent, canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
