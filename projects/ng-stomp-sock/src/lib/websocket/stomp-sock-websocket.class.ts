import { Observable, Subject } from 'rxjs';
import { StompSubscription, Frame } from '@stomp/stompjs';
import { filter, map } from 'rxjs/operators';
import { WsCommand } from '../models/enums/wsCommand';
import { IStompSockWebsocket } from '../models/interfaces/websocket.interface';
import { Guid } from '../helpers/guid.static';
import { WsMessage } from './ws-message.class';


export class StompSockWebSocket implements IStompSockWebsocket {
    public wsMessages$ = new Subject<WsMessage<any>>();
    private _guid: string;
    private _subscription: StompSubscription;
    public get channel(): string {

        return this._guid;
    }
    constructor(public stompClient: any, subscribeURL: string, public headers: any = {}) {
        this._guid = Guid.newGuid();
        this._subscribe(subscribeURL);
    }

    private _subscribe(url: string) {
        this._subscription = this.stompClient.subscribe(`${url}/${this.channel}`,
            (message: Frame) => {
                if (this.isValidJSON(message.body)) {
                    this.wsMessages$.next(new WsMessage(message.command as WsCommand, JSON.parse(message.body)));
                }
            }, { pageRequest: JSON.stringify(this.headers) });
    }

    public unsubscribe() {
        this._subscription.unsubscribe();
    }

    public on<T>(event: WsCommand): Observable<T> {
        if (event) {

            return this.wsMessages$.pipe(
                filter((message: WsMessage<T>) => message.event === event),
                map((message: WsMessage<T>) => message.data)
            );
        }
    }

    public send(destination: string, data: any): void {
        this.stompClient.publish({ destination: `${destination}/${this._guid}`, headers: { pageRequest: JSON.stringify(data), body: {} } });
    }

    public isValidJSON(text: string): boolean {
        try {
            JSON.parse(text);
            return true;
        } catch {
            return false;
        }
    }
}
