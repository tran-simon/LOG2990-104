import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import { Coordinate } from './Coordinate';
import { CreatorTool } from './CreatorTool';
import { Line } from './Line';

export class LineTool extends CreatorTool {
  private line: Line;
  private linePreview: Line;
  private isNewLine = true;

  buildShape(): Line {
    throw new Error('Method not implemented.');
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  handleMouseEvent(e: MouseEvent): void {
    // todo - make a proper mouse manager

    if (!this.isNewLine) {
      if (e.type === 'click') {
        this.drawShape();
        this.isNewLine = true;
      } else if (e.type === 'mousemove') {
        this.line.endCoord = new Coordinate(e.offsetX, e.offsetY);
        this.linePreview.endCoord = new Coordinate(e.offsetX, e.offsetY);
        this.refreshPreview();
      }
    } else if (e.type === 'click') {
      this.isNewLine = false;

      this.line = new Line();
      this.line.startCoord = new Coordinate(e.offsetX, e.offsetY);
      this.line.endCoord = new Coordinate(e.offsetX, e.offsetY);

      this.linePreview = new Line();
      this.linePreview.startCoord = new Coordinate(e.offsetX, e.offsetY);
      this.linePreview.endCoord = new Coordinate(e.offsetX, e.offsetY);

      this.drawPreview();
    }
  }

  handleKeyboardEvent(e: KeyboardEvent): void {
    throw new Error('Method not implemented.');
  }

  refreshPreview() {
    this.drawingSurface.svg.nativeElement.removeChild(this.linePreview.svgNode);
    this.drawPreview();
  }

  drawPreview() {
    this.drawingSurface.svg.nativeElement.appendChild(this.linePreview.svg());
  }

  drawShape() {
    this.drawingSurface.svg.nativeElement.appendChild(this.line.svg());
  }
}
