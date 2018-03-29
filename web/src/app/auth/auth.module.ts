import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './containers/register.component';
import { LoginPageComponent } from './containers/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [LoginPageComponent, RegisterPageComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthenticationService]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ])

    // StoreModule.forFeature('auth', reducers),
    // EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthenticationService]
})
export class RootAuthModule {}
