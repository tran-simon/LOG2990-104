import { DrawingSurfaceComponent } from '../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from '../../BaseShape';
import { ToolProperties } from '../../ToolProperties/ToolProperties';
import { Tool } from '../Tool';

export abstract class CreatorTool extends Tool {
  protected isActive: boolean;
  protected _toolProperties: ToolProperties;

  abstract get shape(): BaseShape;

  set toolProperties(properties: ToolProperties) {
    this._toolProperties = properties;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
    this.isActive = false;
  }

  drawShape() {
    this.drawingSurface.svg.nativeElement.appendChild(this.shape.svgNode);
  }

  cancelShape() {
    this.drawingSurface.svg.nativeElement.removeChild(this.shape.svgNode);
    this.isActive = false;
  }
}
