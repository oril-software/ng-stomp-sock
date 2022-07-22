import { Subject, Observable } from 'rxjs';


import { WsCommand } from '../enums/wsCommand';
import { WsMessage } from '../../websocket/ws-message.class';

export interface IStompSockWebsocket {
    wsMessages$: Subject<WsMessage<any>>;
    on<T>(event: WsCommand): Observable<T>;
    send(event: string, headers: any, body: any): void;
    unsubscribe(headers?: any): void;
}
