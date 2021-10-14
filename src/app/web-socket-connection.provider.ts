import { InjectionToken, Type } from '@angular/core';
import { WebsocketProvider } from './websocket-provider.interface';

export interface PusherConnectionData {
  appKey: string;
  cluster: string;
}

export const WEBSOCKET_CONNECTION_DATA = new InjectionToken<PusherConnectionData | AblyConnectionData>('Connection data for websocket implementation');
export const ABLY_CONNECTION_DATA = new InjectionToken<AblyConnectionData>('Connection data for ably websocket implementation');
export const WEBSOCKET_IMPLEMENTATION_CLASS = new InjectionToken<Type<WebsocketProvider>>('Implementation of the websocket service');

export interface AblyConnectionData {
  key: string;
}
