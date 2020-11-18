import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginContainerComponent} from "./login-container/login-container.component";
import { RegisterContainerComponent } from './register-container/register-container.component';

const routes: Routes = [
  {
    path: '',
    component: LoginContainerComponent,
  },
  {
    path: 'register',
    component: RegisterContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
