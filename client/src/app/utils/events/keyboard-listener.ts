import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';

export class KeyboardListener {
  static keyDown(event: KeyboardEvent, handler: KeyboardEventHandler): boolean {
    let success: boolean;
    let prefix = event.ctrlKey ? 'ctrl_' : '';
    prefix += event.shiftKey ? 'shift_' : '';
    const func = handler[prefix + event.key];
    success = func ? func(event) : false;

    if (success) {
      event.preventDefault();
    }
    return success;
  }
}
