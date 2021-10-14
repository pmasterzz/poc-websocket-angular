import { Inject, Injectable } from '@angular/core';
import { WebsocketProvider } from './websocket-provider.interface';
import { Observable } from 'rxjs';
import { Realtime } from 'Ably';
import { AblyConnectionData, WEBSOCKET_CONNECTION_DATA } from './web-socket-connection.provider';

@Injectable({
  providedIn: 'root',
})
export class AblyWebsocketService implements WebsocketProvider {
  private client: Realtime;

  constructor(
    @Inject(WEBSOCKET_CONNECTION_DATA)
    public connectionData: AblyConnectionData,
  ) {
    this.initialize();
  }

  public disconnect(): void {
    this.client.close();
  }

  public getData<T = any>(channel: string, event: string, privateChannel: boolean = false): Observable<T> {
    const channelName = privateChannel ? `private:${channel}` : `public:${channel}`;
    this.client.channels.release(channelName);
    const clientChannel = this.client.channels.get(channelName);

    return new Observable<any>((observer) => {
      clientChannel.subscribe(event, (message) => {
        observer.next(message.data);
      });
    });
  }

  public initialize(): void {
    this.client = new Realtime({
      useTokenAuth: true,
      authUrl: 'http://localhost/api/ably/auth',
      authHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  // public initialize(): void {
  //   this.client = new Realtime({
  //     key: 'ABLY_KEY',
  //   });
  // }
}
