import {KeyboardEventHandler} from 'src/app/utils/events/KeyboardEventHandler';

export class KeyboardListener {

  constructor(private handler: KeyboardEventHandler) {
  }

  keyDown(event: KeyboardEvent): boolean {
    let success = false;
    if (event.ctrlKey) {
      switch (event.key) {
        case 'o':
          if (this.handler.ctrlO) {
            success = this.handler.ctrlO(event);
          }
          break;
        case 's':
          if (this.handler.ctrlS) {
            success = this.handler.ctrlS(event);
          }
          break;
        case 'g':
          if (this.handler.ctrlG) {
            success = this.handler.ctrlG(event);
          }
          break;
        case 'e':
          if (this.handler.ctrlE) {
            success = this.handler.ctrlE(event);
          }
          break;
      }
    }

    if (success) {
      event.preventDefault();
    }
    return success;
  }
}
