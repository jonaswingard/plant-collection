import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { routes } from './routes';
import { AppPageComponent } from './core/components/app';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CoreModule.forRoot()
  ],
  bootstrap: [AppPageComponent]
})
export class AppModule {}
