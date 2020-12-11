import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { NgxsModule } from '@ngxs/store';
import { AppHeaderStore } from './stores/app-header.store';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppHeaderModule,
    NgxsModule.forRoot([AppHeaderStore], {
      developmentMode: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
