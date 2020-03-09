import { Injectable } from '@angular/core';
import { AbstractEventListenerService } from 'src/app/services/event-listeners/abstract-event-listener.service';
import { MouseHandler } from 'src/app/services/event-listeners/mouse-listener/mouse-handler';

@Injectable()
export class MouseListenerService extends AbstractEventListenerService<MouseEvent> {
  static readonly EVENT_DBLCLICK: string = 'dblclick';
  static readonly EVENT_MOUSEMOVE: string = 'mousemove';
  static readonly EVENT_MOUSEDOWN: string = 'mousedown';
  static readonly EVENT_MOUSEUP: string = 'mouseup';
  static readonly EVENT_MOUSELEAVE: string = 'mouseleave';
  static readonly EVENT_CLICK: string = 'click';
  static readonly EVENT_CONTEXTMENU: string = 'contextmenu';

  static defaultMouseListener(handler: MouseHandler): MouseListenerService {
    const mouseListenerService = new MouseListenerService();
    mouseListenerService.addEvents([
      [this.EVENT_DBLCLICK, (e) => handler.handleDblClick(e)],
      [this.EVENT_MOUSEMOVE, (e) => handler.handleMouseMove(e)],
      [this.EVENT_MOUSEDOWN, (e) => handler.handleMouseDown(e)],
      [this.EVENT_MOUSEUP, (e) => handler.handleMouseUp(e)],
      [this.EVENT_MOUSELEAVE, (e) => handler.handleMouseLeave(e)],
      [this.EVENT_CLICK, (e) => handler.handleClick(e)],
      [this.EVENT_CONTEXTMENU, (e) => handler.handleContextMenu(e)],
    ]);

    return mouseListenerService;
  }

  getIdentifierFromEvent(event: MouseEvent): string {
    return event.type;
  }
}
