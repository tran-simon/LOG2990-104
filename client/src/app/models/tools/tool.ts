import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { DrawingSurfaceComponent } from '../../components/pages/editor/drawing-surface/drawing-surface.component';

export enum ToolType {
  Pen = 'pen-tool',
  Brush = 'brush-tool',
  Rectangle = 'rectangle-tool',
  Line = 'line-tool',
  ColorPicker = 'colorpicker-tool',
}
export abstract class Tool {
  protected drawingSurface: DrawingSurfaceComponent;
  protected keyboardEventHandler: KeyboardEventHandler;
  private _mousePosition: Coordinate;
  readonly type: ToolType;

  get mousePosition(): Coordinate {
    return this._mousePosition;
  }

  protected constructor(type: ToolType, drawingSurface: DrawingSurfaceComponent) {
    this.type = type;
    this.drawingSurface = drawingSurface;
    this.keyboardEventHandler = {} as KeyboardEventHandler;
    this._mousePosition = new Coordinate();
  }

  abstract handleToolMouseEvent(e: MouseEvent): void;

  handleMouseEvent(e: MouseEvent): void {
    this._mousePosition = new Coordinate(e.offsetX, e.offsetY);
    this.handleToolMouseEvent(e);
  }

  handleKeyboardEvent(e: KeyboardEvent): boolean {
    return KeyboardListener.keyEvent(e, this.keyboardEventHandler);
  }
}
