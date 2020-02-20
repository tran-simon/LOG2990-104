import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Tool, ToolType } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';

export abstract class CreatorTool extends Tool {
  abstract get shape(): BaseShape;

  protected constructor(editorService: EditorService, type: ToolType, isActive = false) {
    super(editorService, type);
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
    // this.editorService.drawingSurface.cancelShape(this);
    this.isActive = false;
  }
}
