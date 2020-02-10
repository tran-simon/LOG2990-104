/**
 * Interface for handling keyboard events caught by a KeyboardListener.
 *
 * Functions name must follow the pattern (ie: 'ctrl_shift_s')
 */
export interface KeyboardEventHandler {
  [name: string]: ((event: KeyboardEvent) => boolean) | undefined;
}
