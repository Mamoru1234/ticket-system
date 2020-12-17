import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { NgxsModule } from '@ngxs/store';
import { AppHeaderStore } from './stores/app-header.store';
import { HttpClientModule } from '@angular/common/http';
import { LandingModule } from './components/landing/landing.module';
import { GraphQLModule } from './graphql/graphql.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    NgxsModule.forRoot([AppHeaderStore], {
      developmentMode: !environment.production,
    }),
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
