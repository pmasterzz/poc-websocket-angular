import { TestBed } from '@angular/core/testing';

import { PusherWebsocketService } from './pusher-websocket.service';

describe('PusherWebsocketService', () => {
  let service: PusherWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
