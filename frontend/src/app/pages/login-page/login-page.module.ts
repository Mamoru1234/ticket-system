import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutes } from './login-page.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../components/input-wrapper/input-wrapper.module';
import { ServerErrorContainerModule } from '../../components/server-error-container/server-error-container.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutes,
    ReactiveFormsModule,
    InputWrapperModule,
    ServerErrorContainerModule,
  ],
})
export class LoginPageModule { }
