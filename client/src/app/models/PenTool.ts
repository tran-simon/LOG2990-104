import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import { Coordinate } from './Coordinate';
import { CreatorTool } from './CreatorTool';
import { Path } from './Path';

export class PenTool extends CreatorTool {
  private path: Path;

  get shape() {
    return this.path;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  handleMouseEvent(e: MouseEvent): void {
    const mouseCoord = new Coordinate(e.offsetX, e.offsetY);
    if (this.isActive) {
      if (e.type === 'mouseup') {
        this.isActive = false;
      } else if (e.type === 'mousemove') {
        this.shape.addPoint(mouseCoord);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.path = new Path(mouseCoord);
      this.drawShape();
    }
  }
}
