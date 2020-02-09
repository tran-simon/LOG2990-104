import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import { CompositeLine } from './CompositeLine';
import { Coordinate } from './Coordinate';
import { CreatorTool } from './CreatorTool';
import { Line } from './Line';

export class LineTool extends CreatorTool {
  private line: CompositeLine;
  private activeLine = false;

  buildShape(): Line {
    throw new Error('Method not implemented.');
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  handleMouseEvent(e: MouseEvent): void {
    // todo - make a proper mouse manager
    if (this.activeLine) {
      if (e.type === 'dblclick') {
        this.activeLine = false;
      } else if (e.type === 'mousemove') {
        this.line.updateCurrentCoord(new Coordinate(e.offsetX, e.offsetY));
      } else if (e.type === 'mousedown') {
        this.line.addPoint(new Coordinate(e.offsetX, e.offsetY));
      }
    } else if (e.type === 'mousedown') {
      this.activeLine = true;
      this.line = new CompositeLine(new Coordinate(e.offsetX, e.offsetY));
      this.line.addPoint(new Coordinate(e.offsetX, e.offsetY));

      this.drawShape();
    }
  }

  handleKeyboardEvent(e: KeyboardEvent): void {
    throw new Error('Method not implemented.');
  }

  drawShape() {
    this.drawingSurface.svg.nativeElement.appendChild(this.line.svgNode);
  }
}
