import { Observable, Subject } from "rxjs";
import { StompSubscription, Frame } from "@stomp/stompjs";
import { filter, map } from "rxjs/operators";
import { WsCommand } from "../models/enums/wsCommand";
import { IStompSockWebsocket } from "../models/interfaces/websocket.interface";
import { Guid } from "../helpers/guid.static";
import { WsMessage } from "./ws-message.class";

export class StompSockWebSocket implements IStompSockWebsocket {
  public wsMessages$ = new Subject<WsMessage<any>>();
  private _guid: string;
  private _subscription: StompSubscription;
  public get channel(): string {
    return this._guid;
  }
  constructor(
    public stompClient: any,
    subscribeURL: string,
    public headers: { [key: string]: any } = {}
  ) {
    this._guid = Guid.newGuid();
    this._subscribe(subscribeURL);
  }

  private _subscribe(url: string) {
    this._subscription = this.stompClient.subscribe(
      `${url}`,
      (message: Frame) => {
        if (this.isValidJSON(message.body)) {
          this.wsMessages$.next(
            new WsMessage(
              message.command as WsCommand,
              JSON.parse(message.body)
            )
          );
        }
      },
      this._stringifyHeaders(this.headers)
    );
  }

  private _stringifyHeaders(headers: any): { [key: string]: string } {
    const stringifiedHeaders = {};

    Object.keys(headers).forEach((key) => {
      Object.assign(stringifiedHeaders, {
        [key]:
          typeof headers[key] === "object"
            ? JSON.stringify(headers[key])
            : headers[key],
      });
    });

    return stringifiedHeaders;
  }

  public unsubscribe(headers?: any) {
    if (headers) {
      this._subscription.unsubscribe(this._stringifyHeaders(headers));
    } else {
      this._subscription.unsubscribe();
    }
  }

  public on<T>(event: WsCommand): Observable<T> {
    if (event) {
      return this.wsMessages$.pipe(
        filter((message: WsMessage<T>) => message.event === event),
        map((message: WsMessage<T>) => message.data)
      );
    }
  }

  public send(destination: string, headers: any = {}, body: any = {}): void {
    this.stompClient.publish({
      destination: `${destination}`,
      headers: this._stringifyHeaders(headers),
      body,
    });
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
