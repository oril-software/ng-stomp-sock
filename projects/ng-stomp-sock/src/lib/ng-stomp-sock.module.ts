import { NgModule, ModuleWithProviders } from '@angular/core';
import { config } from './tokens/injection-token';
import { WebSocketConfig } from './models/interfaces/websocket-config.interface';
import { StompSockService } from './services/websocket/stomp-sock.service';

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
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders {

    return {
      ngModule: NgStompSockModule,
      providers: [{ provide: config, useValue: wsConfig }]
    };
  }
}
