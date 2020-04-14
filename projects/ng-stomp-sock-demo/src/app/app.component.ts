import { Component, OnInit } from '@angular/core';
import { StompSockService } from 'projects/ng-stomp-sock/src/lib/services/websocket/stomp-sock.service';
import { WsCommand } from 'projects/ng-stomp-sock/src/lib/models/enums/wsCommand';
import { Observable } from 'rxjs';
import { StompSockWebSocket } from 'projects/ng-stomp-sock/src/lib/websocket/stomp-sock-websocket.class';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-stomp-sock-demo';

  public activityWS: StompSockWebSocket;
  public activities$: Observable<any>;

  constructor(
    private _webSocketService: StompSockService,
  ) {

  }

  ngOnInit() {
    this._webSocketService.connected$
      .pipe(filter(connected => !!connected))
      .subscribe(() => this._getWebSocket());
  }
  private _getWebSocket() {
    this._webSocketService.getWebSocket('api_endpoint', {}) // e.g. ('activities', { page: 0, size: 10})
      .on(WsCommand.MESSAGE).subscribe(
        response => console.log(response)
      );
  }
}
