import { DrawingSurfaceComponent } from '../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { Path } from '../../Path';
import { PenToolProperties } from '../../ToolProperties/PenToolProperties';
import { CreatorTool } from './CreatorTool';

export class PenTool extends CreatorTool {
  protected _toolProperties: PenToolProperties;
  private path: Path;

  get shape() {
    return this.path;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
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
      this.path = new Path(this.mousePosition);
      this.drawShape();
    }
  }
}
