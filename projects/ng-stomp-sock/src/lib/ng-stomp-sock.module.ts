import { NgModule, ModuleWithProviders } from '@angular/core';
import { config } from './tokens/injection-token';
import { WebSocketConfig } from './models/interfaces/websocket-config.interface';
import { StompSockService } from './services/stomp-sock/stomp-sock.service';

@NgModule({
  declarations: [

  ],
  imports: [

  ],
  exports: [

  ],
  providers: [
    StompSockService
  ]
})
export class NgStompSockModule {
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders<NgStompSockModule> {

    return {
      ngModule: NgStompSockModule,
      providers: [{ provide: config, useValue: wsConfig }]
    };
  }
}
