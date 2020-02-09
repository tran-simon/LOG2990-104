import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';

export class KeyboardListener {
  /**
   * Handles keyboard events with KeyboardEventHandler.
   * It looks for a function in the handler following KeyboardEventHandler pattern (ie: 'ctrl_shift_o')
   */
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
