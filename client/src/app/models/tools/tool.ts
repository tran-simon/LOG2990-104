import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { MouseHandler } from 'src/app/services/event-listeners/mouse-listener/mouse-handler';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { ToolProperties } from '../tool-properties/tool-properties';

export abstract class Tool<T = ToolProperties> implements MouseHandler {
  toolProperties: T;
  get mousePosition(): Coordinate {
    return this._mousePosition;
  }

  protected constructor(editorService: EditorService) {
    this.editorService = editorService;
    this._mousePosition = new Coordinate();
    this.keyboardListener = new KeyboardListenerService();
    this.mouseListener = MouseListenerService.defaultMouseListener(this);
  }

  protected keyboardListener: KeyboardListenerService;
  private mouseListener: MouseListenerService;

  private _mousePosition: Coordinate;
  protected editorService: EditorService;
  protected isActive: boolean;

  handleDblClick(e: MouseEvent): boolean | void {
    return;
  }

  handleMouseDown(e: MouseEvent): boolean | void {
    return;
  }

  handleMouseMove(e: MouseEvent): boolean | void {
    return;
  }

  handleMouseUp(e: MouseEvent): boolean | void {
    return;
  }

  handleMouseLeave(e: MouseEvent): boolean | void {
    return;
  }

  handleClick(e: MouseEvent): boolean | void {
    return;
  }

  handleContextMenu(e: MouseEvent): boolean | void {
    return true;
  }

  handleMouseEvent(e: MouseEvent): boolean {
    this._mousePosition = new Coordinate(e.offsetX, e.offsetY);
    return this.mouseListener.handle(e);
  }

  handleKeyboardEvent(e: KeyboardEvent): boolean {
    return this.keyboardListener.handle(e);
  }

  cancel(): void {
    this.isActive = false;
    this.editorService.clearShapesBuffer();
  }
}
