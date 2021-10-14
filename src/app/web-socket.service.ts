import { Inject, Injectable } from '@angular/core';
import { WebsocketProvider } from './websocket-provider.interface';
import { WEBSOCKET_IMPLEMENTATION_CLASS } from './web-socket-connection.provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements WebsocketProvider {
  constructor(
    @Inject(WEBSOCKET_IMPLEMENTATION_CLASS)
    private websocketImplementation: WebsocketProvider) {
    this.initialize();
  }

  public disconnect(): void {
    this.websocketImplementation.disconnect();
  }

  public getData<T = any>(channel: string, event: string, privateChannel: boolean = false): Observable<T> {
    return this.websocketImplementation.getData(channel, event, privateChannel);
  }

  public initialize(): void {
    this.websocketImplementation.initialize()
  }
}
