export interface KeyboardEventHandler {
  ctrlO?(event: KeyboardEvent): boolean;

  ctrlS?(event: KeyboardEvent): boolean;

  ctrlG?(event: KeyboardEvent): boolean;

  ctrlE?(event: KeyboardEvent): boolean;

  ctrlX?(event: KeyboardEvent): boolean;

  ctrlC?(event: KeyboardEvent): boolean;

  ctrlV?(event: KeyboardEvent): boolean;

  ctrlD?(event: KeyboardEvent): boolean;

  ctrlA?(event: KeyboardEvent): boolean;

  ctrlZ?(event: KeyboardEvent): boolean;

  ctrlShiftZ?(event: KeyboardEvent): boolean;

  keyDown(event: KeyboardEvent): void;
}
