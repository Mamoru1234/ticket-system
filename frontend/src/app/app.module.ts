import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { NgxsModule } from '@ngxs/store';
import { AppHeaderStore } from './stores/app-header.store';
import { TokenStore } from './stores/token.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppHeaderModule,
    NgxsModule.forRoot([AppHeaderStore, TokenStore], {
      developmentMode: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
