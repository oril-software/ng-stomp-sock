import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StompSockService, StompSockWebSocket, WsCommand } from '@oril/ng-stomp-sock';

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
