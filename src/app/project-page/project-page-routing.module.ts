import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../helpers/guard/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPageRoutingModule { }
