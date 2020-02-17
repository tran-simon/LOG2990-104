import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { Tool } from 'src/app/models/tools/tool';

export abstract class CreatorTool extends Tool {
  protected isActive: boolean;
  protected abstract _toolProperties: ToolProperties;

  abstract get shape(): BaseShape;

  set toolProperties(properties: ToolProperties) {
    this._toolProperties = properties;
  }

  protected constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
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
