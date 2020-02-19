import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { Coordinate } from 'src/app/utils/math/coordinate';

export enum ToolType {
  Pen = 'pen-tool',
  Brush = 'brush-tool',
  Rectangle = 'rectangle-tool',
  Line = 'line-tool',
}
export abstract class Tool {
  protected keyboardEventHandler: KeyboardEventHandler;
  private _mousePosition: Coordinate;
  readonly type: ToolType;
  abstract toolProperties: ToolProperties;

  get mousePosition(): Coordinate {
    return this._mousePosition;
  }

  protected constructor(type: ToolType) {
    this.type = type;
    this.keyboardEventHandler = {} as KeyboardEventHandler;
    this._mousePosition = new Coordinate();
  }

  abstract handleToolMouseEvent(e: MouseEvent, drawingSurface: DrawingSurfaceComponent): void;

  handleMouseEvent(e: MouseEvent, drawingSurface: DrawingSurfaceComponent): void {
    this._mousePosition = new Coordinate(e.offsetX, e.offsetY);
    this.handleToolMouseEvent(e, drawingSurface);
  }

  handleKeyboardEvent(e: KeyboardEvent): boolean {
    return KeyboardListener.keyEvent(e, this.keyboardEventHandler);
  }
}
