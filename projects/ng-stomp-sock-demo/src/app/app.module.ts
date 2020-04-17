import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgStompSockModule } from '@oril/ng-stomp-sock';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgStompSockModule.config({
      url: 'SOCKET_API_URL' // e.g. https://api.com/sockets
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
