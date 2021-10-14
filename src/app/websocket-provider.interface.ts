import { Observable } from 'rxjs';

export interface WebsocketProvider {
  disconnect(): void;
  getData<T = any>(channel: string, event: string, privateChannel: boolean): Observable<T>;
  initialize(): void;
}
