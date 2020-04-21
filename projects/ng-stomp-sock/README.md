# ng-stomp-sock

This package is an Angular 8+ wrapper for using [STOMP.js](https://github.com/stomp-js/stompjs) over [SockJS](https://github.com/sockjs/sockjs-client).

![ng-stomp-sock demo](https://raw.githubusercontent.com/oril-software/ng-stomp-sock/master/projects/ng-stomp-sock-demo/src/assets/demo.gif)

# Installation

1. Use the node package manager [npm](https://www.npmjs.com/) to install `ng-stomp-sock`.

```bash
npm install @oril/ng-stomp-sock @stomp/stompjs sockjs-client 
```
2. In your `src/polyfills.ts` file add
(🛎️This is a workaround for STOMP.js [global is not defined issue](https://github.com/stomp-js/ng2-stompjs/issues/70)):

```typescript
(window as any).global = window;
```

You are configured now.

# Usage

### Module
Import the `NgStompSockModule` in your `AppModule`.
```typescript
import { NgStompSockModule } from '@oril/ng-stomp-sock'
//...
@NgModule({
  imports: [
    //...
    NgStompSockModule.config({
      url: 'SOCKET_API_URL'
    }),
    //...
  ],
  //...
})
//...
```
### Component or Service


```typescript
import { StompSockService, StompSockWebSocket, WsCommand } from '@oril/ng-stomp-sock';

export class AppComponent implements OnInit {

  public activityWS: StompSockWebSocket;

  constructor(
    private _webSocketService: StompSockService
  ) { }

  ngOnInit() {
    this.connectToAPI();
  }

  public connectToAPI() {
    this._webSocketService.connected$
      .pipe(filter(connected => !!connected))
      .subscribe(() => this.connectToEndpoint());
  }

  public connectToEndpoint() {
    this.activityWS = this._webSocketService.getWebSocket('endpoint');
    this._subscribeActivity();
  }

  public send() {
    this.activityWS.send('request_endpoint', { });
  }

  public disconnect() {
    this.activityWS.unsubscribe();
  }

  private _subscribeActivity() {
    this.activityWS.on<any>(WsCommand.MESSAGE)
      .subscribe(response => console.log(response));
  }
}
```

# API

## StompSockService

Factory service to manage StompSockWebSocket instances.

### Methods

`getWebSocket(destination: string, headers?: any): 
StompSockWebSocket`

Subscribe to a STOMP Broker location.

##### Parameters

| Name               | Type   | Description           |
| ------------------ |--------| ----------------------|
| destination        | string | STOMP Broker location |
| headers (optional) | any    | Request header        |

---

`unsubscribe(destination: string)`

Unsubscribe STOMP broker from a subscription.

##### Parameters

| Name        | Type   | Description     |
| ----------- |--------| --------------- |
| destination | string | Endpoint string |

---

### Properties

`connected$: BehaviorSubject<boolean>`

STOMP Client connection status.
🛎️Only if STOMP Client is connected STOMP Broker can subscribe.

## StompSockWebSocket

Wrapper for STOMP Client over SockJS

### Methods

`on<T>(event: WsCommand): Observable<T>`

Returns messages from STOMP Client filtered by event.

##### Parameters

| Name      | Type      | Description       |
| --------- |-----------| ------------------|
| event     | WsCommand | Filter event type |

---

`send(destination: string, data: any): void`

Sends a message to a named destination.

##### Parameters

| Name            | Type   | Description       |
| --------------- |--------| ------------------|
| destination     | string | Endpoint string   |
| destination     | Object | Request headers   |

---

`unsubscribe(): void`

Unsubscribes instance.

---

### Properties

`stompClient: any`

STOMP Client instance.

---

`headers: any`

STOMP Client headers.

---

`get channel(): string`

STOMP Client channel.


## WsCommand

STOMP Client message types

enum

| Value           | Description          |
| --------------- | ---------------------|
| MESSAGE         | Success response type |
| ERROR           | Error response type  |


# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# License
[MIT](https://github.com/oril-software/ng-stomp-sock/blob/master/LICENSE)