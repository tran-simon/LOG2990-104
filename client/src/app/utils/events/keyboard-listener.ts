import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';

export class KeyboardListener {
  static keyEvent(event: KeyboardEvent, handler: KeyboardEventHandler): boolean {
    let success: boolean;
    let prefix = event.ctrlKey ? 'ctrl_' : '';
    prefix += event.shiftKey ? 'shift_' : '';
    const suffix = event.type === 'keyup' ? '_up' : '';
    const func = handler[prefix + event.key.toLowerCase() + suffix];

    if (func) {
      success = func(event);
    } else if (handler.def) {
      success = handler.def(event);
    } else {
      success = false;
    }

    if (success) {
      event.preventDefault();
    }
    return success;
  }
}
