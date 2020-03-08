import { Injectable } from '@angular/core';
import { AbstractEventListenerService } from 'src/app/services/event-listeners/abstract-event-listener.service';

@Injectable()
export class MouseListenerService extends AbstractEventListenerService<MouseEvent> {

  getIdentifierFromEvent(event: MouseEvent): string {
    return event.type;
  }
}
