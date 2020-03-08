import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener.service';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class Tool<T = ToolProperties> {
  protected keyboardListener: KeyboardListenerService;
  get mousePosition(): Coordinate {
    return this._mousePosition;
  }

  protected constructor(editorService: EditorService) {
    this.editorService = editorService;
    this._mousePosition = new Coordinate();
    this.keyboardListener = new KeyboardListenerService();
  }
  private _mousePosition: Coordinate;
  protected editorService: EditorService;
  protected isActive: boolean;
  toolProperties: T;
  protected abstract updateProperties(): void;

  handleMouseEvent(e: MouseEvent): void {
    this._mousePosition = new Coordinate(e.offsetX, e.offsetY);
    if (this.isActive) {
      this.updateProperties();
    }
  }

  handleKeyboardEvent(e: KeyboardEvent): boolean {
    return this.keyboardListener.handle(e);
  }

  cancel(): void {
    this.isActive = false;
    this.editorService.clearShapesBuffer();
  }
}
