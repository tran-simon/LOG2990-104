import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { Tool, ToolType } from 'src/app/models/tools/tool';

export abstract class CreatorTool extends Tool {
  protected isActive: boolean;
  abstract toolProperties: ToolProperties;

  abstract get shape(): BaseShape;

  protected constructor(drawingSurface: DrawingSurfaceComponent, type: ToolType) {
    super(type, drawingSurface);
    this.isActive = false;
  }

  drawShape(): void {
    this.drawingSurface.svg.nativeElement.appendChild(this.shape.svgNode);
  }

  cancelShape(): void {
    this.drawingSurface.svg.nativeElement.removeChild(this.shape.svgNode);
    this.isActive = false;
  }
}
