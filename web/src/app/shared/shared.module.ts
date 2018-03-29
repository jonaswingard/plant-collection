import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStatusComponent } from './components/login-status.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginStatusComponent],
  exports: [LoginStatusComponent]
})
export class SharedModule { }
