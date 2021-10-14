import { ChangeDetectorRef, Component } from '@angular/core';
import { MyMessageService } from '../my-message.service';
import { MessageService } from 'primeng/api';

interface Message {
  message: string
}

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
})
export class MessagePageComponent {
  public messages: Message[] = [];
  public privateMessages: Message[] = [];
  public messageValue: string;

  constructor(private myMessageService: MyMessageService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef,
  ) {
    this.myMessageService.getTasks().subscribe((message) => {
      this.messageService.add({ severity: 'info', summary: `Task ${message?.message.message} added!`, key: 'public' });
      this.cdr.detectChanges();
    });

    this.myMessageService.getPrivateMessages().subscribe((message) => {
      this.messageService.add({ severity: 'info', summary: `Task ${message?.message.message} added!`, key: 'private' });
      this.cdr.detectChanges();
    });
  }

  public addPublicMessage(): void {
    this.myMessageService.addTask(this.messageValue);
    this.messageValue = '';
  }

  public addPrivateMessage(): void {
    this.myMessageService.addPrivateMessage(this.messageValue);
    this.messageValue = '';
  }
}
