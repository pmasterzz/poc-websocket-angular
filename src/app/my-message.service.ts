import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class MyMessageService {
  constructor(
    private webSocketService: WebsocketService,
    private http: HttpClient,
  ) {
  }

  public getTasks(): Observable<any> {
    return this.webSocketService.getData('message-list', 'add-message', false);
  }

  public getPrivateMessages(): Observable<any> {
    return this.webSocketService.getData('message-list.' + localStorage.getItem('userId'), 'add-message', true);
  }

  public disconnect(): void {
    this.webSocketService.disconnect();
  }

  public addPrivateMessage(message: string): void {
    this.http.post('http://localhost/api/message/private/add', { message }).subscribe();
  }

  public addTask(name: string): void {
    this.http.post('http://localhost/api/message/add', { message: name }).subscribe();
  }
}
