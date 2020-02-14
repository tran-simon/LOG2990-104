import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Path } from 'src/app/models/Path';
import { PenToolProperties } from 'src/app/models/ToolProperties/PenToolProperties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/CreatorTool';

export class PenTool extends CreatorTool {
  protected _toolProperties: PenToolProperties;
  protected path: Path;

  get shape(): Path {
    return this.path;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  initPath() {
    this.path = new Path(this.mousePosition);

    this.path.properties.strokeWidth = this._toolProperties.thickness;
    this.path.properties.strokeColor = this._toolProperties.primaryColor;
    this.path.properties.strokeOpacity = this._toolProperties.primaryColor.a;

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
      this.initPath();
      this.isActive = true;
    }
  }
}
