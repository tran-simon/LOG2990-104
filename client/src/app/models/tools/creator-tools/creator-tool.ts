import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Tool, ToolType } from 'src/app/models/tools/tool';

export abstract class CreatorTool extends Tool {
  protected isActive: boolean;

  abstract get shape(): BaseShape;

  protected constructor(editorComponent: EditorComponent, type: ToolType, isActive = false) {
    super(editorComponent, type);
    this.isActive = isActive;
  }

  drawShape(): void {
    this.editorComponent.drawingSurface.drawShape(this);
  }

  cancelShape(): void {
    this.editorComponent.drawingSurface.cancelShape(this);
    this.isActive = false;
  }
}
