import { Injectable, Inject } from '@angular/core';
import { config } from '../../tokens/injection-token';
import * as SockJS from 'sockjs-client';
import { FactoryItem } from '../../models/interfaces/factory-item.interface';
import { BehaviorSubject } from 'rxjs';
import { Client } from '@stomp/stompjs';
import { WebSocketConfig } from '../../models/interfaces/websocket-config.interface';
import { StompSockWebSocket } from '../../websocket/stomp-sock-websocket.class';

@Injectable({
  providedIn: 'root'
})
export class StompSockService {
  private _ws: WebSocket;
  private _stompClient: Client;
  private _factory: FactoryItem<StompSockWebSocket>[] = [];
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(@Inject(config) private _wsConfig: WebSocketConfig) {

    this._connectSocket(this._wsConfig);
  }


  private _connectSocket(wsConfig: WebSocketConfig) {
    this._ws = new SockJS(wsConfig.url);
    this._stompClient = new Client();
    this._stompClient.webSocketFactory = () => new SockJS(wsConfig.url);
    this._stompClient.onConnect = f => this.connected$.next(true);
    this._stompClient.reconnectDelay = this._wsConfig.reconnectInterval ? this._wsConfig.reconnectInterval : 3000;
    this._stompClient.activate();
  }

  public getWebSocket(destination: string, headers?: any): StompSockWebSocket {

    return this._factoryGet(destination, headers).value as any;
  }

  private _factoryGet(type: string, headers?: any): FactoryItem<any> {
    if (!this._factory || !this._factory.length) {
      const pushedIndex = this._pushIntoFactory(type, headers);

      return this._factory[pushedIndex];
    }

    const idx = this._factory.findIndex(
      item => item.name === type
    );

    if (idx === -1) {
      const pushedIndex = this._pushIntoFactory(type, headers);

      return this._factory[pushedIndex];
    }

    return this._factory[idx];
  }

  private _pushIntoFactory(type: string, headers: any): number {
    const aws = new StompSockWebSocket(this._stompClient, type, headers);
    const factoryItem = new FactoryItem<StompSockWebSocket>(type, aws);
    const index = this._factory.push(factoryItem) - 1; // array.length - 1

    return index;
  }

  private _removeFromFactory(type: string) {
    const idx = this._factory.findIndex(item => {

      return item.name === type;
    });
    this._factory[idx].value.unsubscribe();
    this._factory.splice(idx, 1);
  }

  public unsubscribe(destination: string) {
    this._removeFromFactory(destination);
  }
}

