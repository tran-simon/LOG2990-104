import { TestBed } from '@angular/core/testing';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';

describe('MouseListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MouseListenerService]
  }));

  it('should be created', () => {
    const service: MouseListenerService = TestBed.get(MouseListenerService);
    expect(service).toBeTruthy();
  });
});
