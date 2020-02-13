import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Path } from 'src/app/models/Path';
import { CreatorTool } from '../CreatorTool';

export class PenTool extends CreatorTool {
  protected path: Path;

  get shape(): Path {
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
