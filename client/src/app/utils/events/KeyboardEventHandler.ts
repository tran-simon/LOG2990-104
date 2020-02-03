export interface KeyboardEventHandler {
  ctrlO?(event: KeyboardEvent): boolean;

  ctrlS?(event: KeyboardEvent): boolean;

  ctrlG?(event: KeyboardEvent): boolean;

  ctrlE?(event: KeyboardEvent): boolean;

  keyDown(event: KeyboardEvent): void;
}
