import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PusherWebsocketService } from './pusher-websocket.service';
import { MyMessageService } from './my-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MyMessageService],
})
export class AppComponent {
  public messages: { message: string }[] = [];


}
