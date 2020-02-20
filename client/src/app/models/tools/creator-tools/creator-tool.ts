import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { ToolProperties } from '../../tool-properties/tool-properties';

export abstract class CreatorTool<T = ToolProperties> extends Tool<T> {
  abstract get shape(): BaseShape;

  protected constructor(editorService: EditorService, isActive = false) {
    super(editorService);
    this.isActive = isActive;
  }

  applyShape(): void {
    this.isActive = false;
    this.editorService.applyShapesBuffer();
  }

  drawShape(): void {
    this.editorService.addShapeToBuffer(this.shape);
  }

  cancelShape(): void {
    this.editorService.removeShapeFromBuffer(this.shape);
    this.isActive = false;
  }
}
