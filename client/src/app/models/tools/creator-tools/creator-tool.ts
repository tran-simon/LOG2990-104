import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Tool, ToolType } from 'src/app/models/tools/tool';

export abstract class CreatorTool extends Tool {
  protected isActive: boolean;

  abstract get shape(): BaseShape;

  protected constructor(type: ToolType) {
    super(type);
    this.isActive = false;
  }

  drawShape(drawingSurface: DrawingSurfaceComponent): void {
    drawingSurface.drawShape(this);
  }

  cancelShape(drawingSurface: DrawingSurfaceComponent): void {
    drawingSurface.cancelShape(this);
    this.isActive = false;
  }
}
