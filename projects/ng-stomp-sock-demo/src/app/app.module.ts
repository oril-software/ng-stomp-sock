import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgStompSockModule } from 'projects/ng-stomp-sock/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgStompSockModule.config({
      url: 'SOCKET_URL' // e.g. https://api.com/sockets
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
