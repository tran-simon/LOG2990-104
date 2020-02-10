import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
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
    if (this.isActive) {
      if (e.type === 'mouseup') {
        this.isActive = false;
      } else if (e.type === 'mousemove') {
        this.shape.trace = ' L ' + e.offsetX + ' ' + e.offsetY;
        this.shape.svgNode.setAttribute('d', this.shape.trace);
      }
      this.drawShape();
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.path = new Path(e.offsetX, e.offsetY);
      this.drawShape();
    }
  }
}
