import { KeyboardEventHandler } from './keyboard-event-handler';
import { KeyboardListener } from './keyboard-listener';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe('KeyboardListener', () => {
  const handler = {
    ctrl_shift_a: () => true,
    c: () => false,
    x: () => true,
    y: () => true,
    z: () => false,
    z_up: () => true,
  } as KeyboardEventHandler;

  const handlerWithDefault = {
    x: () => false,
    def: (e) => KeyboardListener.keyEvent(e, handler),
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

    expect(KeyboardListener.keyEvent(event, handler)).toEqual(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('can call right function on keyup', () => {
    const event = {
      key: 'z',
      type: 'keyup',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyEvent(event, handlerWithDefault)).toEqual(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not prevent default when failure', () => {
    const event = {
      key: 'b',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyEvent(event, handler)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('does not prevent default when handler function returns false', () => {
    const event = {
      key: 'c',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyEvent(event, handler)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('can use default handler and execute right child function', () => {
    const event = {
      key: 'y',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyEvent(event, handlerWithDefault)).toEqual(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not use default handler if function exists', () => {
    const event = {
      key: 'x',
      preventDefault,
    } as KeyboardEvent;

    expect(KeyboardListener.keyEvent(event, handlerWithDefault)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
