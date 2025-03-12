import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { errorInterceptor } from '../helpers/interceptors/error.interceptor';
import { appConfig } from '../app.config';
import { RegisterComponent } from './register/register.component';
import { jwtInterceptor } from '../helpers/interceptors/jwt.interceptor';
import { DialogModule } from 'primeng/dialog';
import { ComponentModule } from '../../app/component/component.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [LoginComponent, LandingPageComponent, RegisterComponent],
  imports: [
    CommonModule,
    ProjectPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    ComponentModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, provideHttpClient(withInterceptors([
    errorInterceptor,jwtInterceptor
  ]))],
})
export class ProjectPageModule { }
