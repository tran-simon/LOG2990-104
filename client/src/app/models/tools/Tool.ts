import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { DrawingSurfaceComponent } from '../../components/pages/editor/drawing-surface/drawing-surface.component';

export abstract class Tool {
  protected drawingSurface: DrawingSurfaceComponent;
  protected keyboardEventHandler: KeyboardEventHandler;

  constructor(drawingSurface: DrawingSurfaceComponent) {
    this.drawingSurface = drawingSurface;
  }

  abstract handleMouseEvent(e: MouseEvent): void;

  handleKeyboardEvent(e: KeyboardEvent): boolean {
    return KeyboardListener.keyEvent(e, this.keyboardEventHandler);
  }
}
