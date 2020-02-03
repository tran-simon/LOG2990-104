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
        case 'x':
          if (this.handler.ctrlX) {
            success = this.handler.ctrlX(event);
          }
          break;
        case 'c':
          if (this.handler.ctrlC) {
            success = this.handler.ctrlC(event);
          }
          break;
        case 'v':
          if (this.handler.ctrlV) {
            success = this.handler.ctrlV(event);
          }
          break;
        case 'd':
          if (this.handler.ctrlD) {
            success = this.handler.ctrlD(event);
          }
          break;
        case 'a':
          if (this.handler.ctrlA) {
            success = this.handler.ctrlA(event);
          }
          break;
        case 'z':
          if (event.shiftKey) {
            if (this.handler.ctrlShiftZ) {
              success = this.handler.ctrlShiftZ(event);
            }
          } else if (this.handler.ctrlZ) {
            success = this.handler.ctrlZ(event);
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
