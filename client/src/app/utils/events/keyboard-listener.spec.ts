import { KeyboardEventHandler } from './keyboard-event-handler';
import { KeyboardListener } from './keyboard-listener';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe('KeyboardListener', () => {
  const handler = {
    ctrl_shift_a: () => true,
    c: () => false,
  } as KeyboardEventHandler;
  let preventDefaultSpy: Spy;
  const preventDefault = () => {
    preventDefaultSpy();
  };

  beforeEach(() => {
    preventDefaultSpy = createSpy('preventDefaultSpy');
    preventDefaultSpy.calls.reset();
  });

  it('can call right function on keydown', () => {
    const event = {
      ctrlKey: true,
      shiftKey: true,
      key: 'a',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyDown(event, handler)).toEqual(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not prevent default when failure', () => {
    const event = {
      key: 'b',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyDown(event, handler)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('does not prevent default when handler function returns false', () => {
    const event = {
      key: 'c',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyDown(event, handler)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
