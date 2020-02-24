import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { ToolProperties } from '../../tool-properties/tool-properties';

export abstract class CreatorTool<T = ToolProperties> extends Tool<T> {
  abstract shape: BaseShape | undefined;
  abstract createShape(): BaseShape;

  protected constructor(editorService: EditorService, isActive = false) {
    super(editorService);
    this.isActive = isActive;
  }

  applyShape(): void {
    this.updateProperties();
    this.shape = undefined;
    this.isActive = false;
    this.editorService.applyShapesBuffer();
  }

  addShape(): void {
    if (this.shape) {
      this.editorService.addShapeToBuffer(this.shape);
    }
  }

  cancelShape(): void {
    this.editorService.clearShapesBuffer();
    this.isActive = false;
  }
}
