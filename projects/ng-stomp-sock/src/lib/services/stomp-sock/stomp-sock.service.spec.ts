import { TestBed } from '@angular/core/testing';

import { StompSockService } from './stomp-sock.service';

describe('StompSockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StompSockService = TestBed.get(StompSockService);
    expect(service).toBeTruthy();
  });
});
