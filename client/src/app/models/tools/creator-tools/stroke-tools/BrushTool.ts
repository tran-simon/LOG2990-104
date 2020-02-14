import { BrushPath } from 'src/app/models/BrushPath';
import { BrushToolProperties } from 'src/app/models/ToolProperties/BrushToolProperties';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { PenTool } from './PenTool';

export class BrushTool extends PenTool {
  protected path: BrushPath;
  protected _toolProperties: BrushToolProperties;

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  initPath() {
    this.path = new BrushPath(this.mousePosition);

    this.path.properties.strokeWidth = this._toolProperties.thickness;
    this.path.properties.strokeColor = this._toolProperties.primaryColor;
    this.path.properties.strokeOpacity = this._toolProperties.primaryColor.a;
    this.path.changeFilter(this._toolProperties.texture);

    this.path.updateProperties();
    this.drawShape();
  }

  handleToolMouseEvent(e: MouseEvent): void {
    if (this.isActive) {
      if (e.type === 'mouseup') {
        this.isActive = false;
      } else if (e.type === 'mousemove') {
        this.shape.addPoint(this.mousePosition);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.initPath();
    }
  }
}
