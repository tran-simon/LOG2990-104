import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Coordinate } from 'src/app/models/Coordinate';
import { Rectangle } from 'src/app/models/Rectangle';
import { CreatorTool } from '../CreatorTool';

export abstract class ShapeTool extends CreatorTool {
  protected previewArea: Rectangle;
  private forceEqualDimensions: boolean;
  private initialMouseCoord: Coordinate;

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);

    this.previewArea = new Rectangle();
    this.forceEqualDimensions = false;

    this.keyboardEventHandler = {
      shift_shift: () => {
        this.forceEqualDimensions = true;
        return false;
      },
      shift_up: () => {
        this.forceEqualDimensions = false;
        return false;
      },
    };
  }

  abstract initShape(c: Coordinate): void;
  abstract resizeShape(origin: Coordinate, dimensions: Coordinate): void;

  handleMouseEvent(e: MouseEvent) {
    // todo - make a proper mouse manager
    const mouseCoord = new Coordinate(e.offsetX, e.offsetY);

    if (this.isActive) {
      if (e.type === 'mouseup') {
        this.isActive = false;
        this.removePreviewArea();
      } else if (e.type === 'mousemove') {
        this.updateCurrentCoord(mouseCoord);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.initialMouseCoord = mouseCoord;
      this.previewArea = new Rectangle(mouseCoord);
      this.drawPreviewArea();
      this.initShape(mouseCoord);
    }
  }

  drawPreviewArea() {
    this.drawingSurface.svg.nativeElement.appendChild(this.previewArea.svgNode);
  }

  removePreviewArea() {
    this.drawingSurface.svg.nativeElement.removeChild(this.previewArea.svgNode);
  }

  updateCurrentCoord(c: Coordinate) {
    const origin = Coordinate.minXYCoord(c, this.initialMouseCoord);
    const dimensions = Coordinate.substract(c, this.initialMouseCoord);

    this.previewArea.origin = origin;
    this.previewArea.width = dimensions.x;
    this.previewArea.height = dimensions.y;

    if (this.forceEqualDimensions) {
      dimensions.x = c.minXYDistance(this.initialMouseCoord);
      dimensions.y = dimensions.x;
    }

    this.resizeShape(origin, dimensions);
  }
}
