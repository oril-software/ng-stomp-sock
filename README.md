# ng-stomp-sock

This package is an Angular 8+ wrapper for using [STOMP.js](https://github.com/stomp-js/stompjs) over [SockJS](https://github.com/sockjs/sockjs-client).

## Installation

Use the node package manager [npm](https://www.npmjs.com/) to install `ng-stomp-sock`.

```bash
npm install ng-stomp-sock @stomp/stompjs sockjs-client 
```
You are configured now.

## Usage

First, import the `NgStompSockModule` in your `AppModule`.
```typescript
import { NgStompSockModule } from 'ng-stomp-sock'
//...
@NgModule({
  imports: [
    //...
    NgStompSockModule.config({
      url: 'SOCKET_URL' // e.g. https://api.com/sockets
    }),
    //...
  ],
  //...
})
//...
```
Second, in your component or service.
```typescript

import { ApplicationWebSocket, WsCommand } from 'ng-stomp-sock';

export class AppComponent implements OnInit {

  constructor(
    private _webSocketService: WebSocketService,
  ) {

  }

  ngOnInit() {
    this._webSocketService.connected$
      .pipe(filter(connected => connected))
      .subscribe(() => this._getWebSocket());
  }

  private _getWebSocket() {
    this._webSocketService.getWebSocket('api_endpoint', {}) // e.g. ('activities', { page: 0, size: 10})
      .on(WsCommand.MESSAGE).subscribe(
        response => console.log(response)
      );
  }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)