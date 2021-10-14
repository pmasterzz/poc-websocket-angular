import { TestBed } from '@angular/core/testing';

import { AblyWebsocketService } from './ably-websocket.service';

describe('AblyWebsocketService', () => {
  let service: AblyWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AblyWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
