import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AblyConnectionData,
  PusherConnectionData,
  WEBSOCKET_CONNECTION_DATA,
  WEBSOCKET_IMPLEMENTATION_CLASS,
} from '../web-socket-connection.provider';
import { PusherWebsocketService } from '../pusher-websocket.service';
import { AblyWebsocketService } from '../ably-websocket.service';
import { WebsocketDriver } from '../websocket-driver.enum';

const driverMap = {
  [WebsocketDriver.PUSHER]: PusherWebsocketService,
  [WebsocketDriver.ABLY]: AblyWebsocketService,
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class WebsocketModule {
  public static forRoot(config: { driver: WebsocketDriver, connectionConfig: PusherConnectionData | AblyConnectionData }): ModuleWithProviders<WebsocketModule> {
    return {
      ngModule: WebsocketModule,
      providers: [
        PusherWebsocketService,
        {
          provide: WEBSOCKET_IMPLEMENTATION_CLASS,
          useClass: driverMap[config.driver],
        },
        {
          provide: WEBSOCKET_CONNECTION_DATA,
          useValue: config.connectionConfig,
        },
      ],
    };
  }
}
