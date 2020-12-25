import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingModule } from './components/landing/landing.module';
import { environment } from '../environments/environment';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserStore } from './stores/user.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    NgxsModule.forRoot([UserStore], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
