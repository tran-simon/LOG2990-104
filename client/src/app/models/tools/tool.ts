import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { ToolProperties } from '../tool-properties/tool-properties';
import { ToolType } from './tool-type';

export abstract class Tool<T = ToolProperties> {
  protected keyboardListener: KeyboardListener;
  toolProperties: T;
  get mousePosition(): Coordinate {
    return this._mousePosition;
  }

  protected constructor(editorService: EditorService) {
    this.editorService = editorService;
    this._mousePosition = new Coordinate();
    this.keyboardListener = new KeyboardListener();
  }
  private _mousePosition: Coordinate;
  protected editorService: EditorService;
  protected isActive: boolean;
  type: ToolType; // todo - add getter and make protected

  handleMouseEvent(e: MouseEvent): void {
    this._mousePosition = new Coordinate(e.offsetX, e.offsetY);
  }

  handleKeyboardEvent(e: KeyboardEvent): boolean {
    return this.keyboardListener.handle(e);
  }

  cancel(): void {
    this.isActive = false;
    this.editorService.clearShapesBuffer();
  }
}
