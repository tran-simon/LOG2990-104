/* tslint:disable:no-string-literal */
import { KeyboardEventAction, KeyboardEventsHandlingMap, KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import createSpyObj = jasmine.createSpyObj;

describe('KeyboardListener', () => {
  let preventDefaultSpy: Spy;
  const preventDefault = () => {
    preventDefaultSpy();
  };

  let keyboardListener: KeyboardListener;

  beforeEach(() => {
    preventDefaultSpy = createSpy('preventDefaultSpy');
    preventDefaultSpy.calls.reset();

    keyboardListener = new KeyboardListener();
    keyboardListener['keyboardEventsHandlingMap'].set('c_keydown', () => false);
    keyboardListener['keyboardEventsHandlingMap'].set('x_keydown', () => true);
    keyboardListener['keyboardEventsHandlingMap'].set('z_keydown', () => false);
    keyboardListener['keyboardEventsHandlingMap'].set('z_keyup', () => true);
    keyboardListener['keyboardEventsHandlingMap'].set('ctrl_shift_a_keydown', ()=> true)
  });

  it('should create', () => {
    expect(keyboardListener).toBeTruthy();
  });

  it('can create keyboard listener with keyboardEventsHandlingMap', () => {
    const map: KeyboardEventsHandlingMap = new Map<string, KeyboardEventAction>([
      ['ID1', () => false],
      ['ID2', () => true]
    ]);

    const keyboardListener1 = new KeyboardListener(map);
    const func: KeyboardEventAction = keyboardListener1['keyboardEventsHandlingMap'].get('ID1') as KeyboardEventAction;

    expect(keyboardListener1).toBeDefined();
    expect(keyboardListener1['keyboardEventsHandlingMap']).toBeDefined();
    expect(func({} as KeyboardEvent)).toEqual(false);
  });

  it('can call right function on keydown', () => {
    const event = {
      ctrlKey: true,
      shiftKey: true,
      key: 'a',
      preventDefault,
    } as KeyboardEvent;

    expect(keyboardListener.handle(event)).toEqual(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('can call right function on keyup', () => {
    const event = {
      key: 'z',
      type: 'keyup',
      preventDefault,
    } as KeyboardEvent;

    expect(keyboardListener.handle(event)).toEqual(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not prevent default when failure', () => {
    const event = {
      key: 'b',
      preventDefault,
    } as KeyboardEvent;
    const identifier = KeyboardListener.getIdentifierFromKeyboardEvent(event);

    expect(keyboardListener['keyboardEventsHandlingMap'].get(identifier)).toBeUndefined();
    expect(keyboardListener.handle(event)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('does not prevent default when handler function returns false', () => {
    const event = {
      key: 'c',
      preventDefault,
    } as KeyboardEvent;
    const identifier = KeyboardListener.getIdentifierFromKeyboardEvent(event);

    expect(keyboardListener['keyboardEventsHandlingMap'].get(identifier)).toBeDefined();
    expect(keyboardListener.handle(event)).toEqual(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('can execute default action', () => {
    const defaultMethodSpy = createSpyObj(['act']);
    keyboardListener.defaultEventAction = () => {
      defaultMethodSpy.act();
      return true;
    };

    const event = {
      key: 'y',
      preventDefault,
    } as KeyboardEvent;

    keyboardListener.handle(event);
    expect(defaultMethodSpy.act).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not call default action if event exists in map', () => {
    keyboardListener.defaultEventAction = createSpy('defaultEventAction').and.returnValue(() => true);
    const event = {
      key: 'x',
      preventDefault,
    } as KeyboardEvent;

    expect(keyboardListener.handle(event)).toEqual(true);
    expect(keyboardListener.defaultEventAction).not.toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('can get identifier', () => {
    expect(KeyboardListener.getIdentifier('key', true, true, 'type')).toEqual('ctrl_shift_key_type');
    expect(KeyboardListener.getIdentifier('key1')).toEqual('key1_keydown');
  });

  it('can get identifier from keyboard event', () => {

    const event = {
      key: 'KEY',
      ctrlKey: true,
      type: 'TYPE'
    } as KeyboardEvent;

    expect(KeyboardListener.getIdentifierFromKeyboardEvent(event)).toEqual('ctrl_KEY_TYPE');
  });

  it('can add event', () => {
    keyboardListener.addEvent('ID', () => false);
    expect(keyboardListener['keyboardEventsHandlingMap'].get('ID')).toBeDefined();
  });

  it('can add multiple events', ()=> {

    keyboardListener.addEvents([
      ['ID1', ()=>false ],
      ['ID2', ()=>false ],
    ]);
    expect(keyboardListener['keyboardEventsHandlingMap'].get('ID1')).toBeDefined();
    expect(keyboardListener['keyboardEventsHandlingMap'].get('ID2')).toBeDefined();
  })
});
