export interface KeyboardEventHandler {
  [name: string]: ((event: KeyboardEvent) => boolean) | undefined;
}
