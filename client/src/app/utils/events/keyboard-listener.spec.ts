import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';

describe('KeyboardListener', () => {
  let keyboardListener: KeyboardListener;
  const keyboardEventHandler = jasmine.createSpyObj<KeyboardEventHandler>(['ctrlO']);

  beforeEach(() => {
    keyboardListener = new KeyboardListener(keyboardEventHandler);
  });

  it('calls appropriate method when key is down', () => {
    keyboardListener.keyDown({ ctrlKey: true, key: 'o' } as KeyboardEvent);
    expect(keyboardEventHandler.ctrlO).toHaveBeenCalled();
  });
});
