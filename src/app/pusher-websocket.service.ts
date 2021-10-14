import { Inject, Injectable } from '@angular/core';
import { WebsocketProvider } from './websocket-provider.interface';
import { Observable, Subject } from 'rxjs';
import Pusher, { Channel } from 'pusher-js';
import { PusherConnectionData, WEBSOCKET_CONNECTION_DATA } from './web-socket-connection.provider';


@Injectable({
  providedIn: 'root',
})
export class PusherWebsocketService implements WebsocketProvider {
  private data = new Subject<any>();
  private client: Pusher;

  constructor(
    @Inject(WEBSOCKET_CONNECTION_DATA)
    private connectionInfo: PusherConnectionData,
  ) {
    this.initialize();
  }

  public initialize(): void {
    this.client = new Pusher(this.connectionInfo.appKey, {
      cluster: this.connectionInfo.cluster,
      authEndpoint: 'http://localhost/broadcasting/auth',
      auth: {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    });
  }

  public disconnect(): void {
    this.client.disconnect();
  }

  /**
   * Listen for events for the defined channel
   *
   * @param channel - name of the channel
   * @param event - name of the event to listen for
   * @param privateChannel
   */
  public getData<T = any>(channel: string, event: string, privateChannel = false): Observable<T> {
      const channelName = privateChannel ? `private-${channel}` : channel;
      let clientChannel = this.client.channels.find(channelName);

      if (!clientChannel) {
      clientChannel = this.client.subscribe(channelName);
    }

    clientChannel = clientChannel.unbind(event);

    return new Observable<T>((observer) => {
      clientChannel.bind(event, (data) => {
        observer.next(data);
      });
    });
  }
}
