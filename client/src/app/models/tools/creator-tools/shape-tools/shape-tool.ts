import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { Coordinate } from 'src/app/utils/math/coordinate';

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
        this.setEqualDimensions(true);
        return false;
      },
      shift_up: () => {
        this.setEqualDimensions(false);
        return false;
      },
    } as KeyboardEventHandler;
  }

  abstract initShape(c: Coordinate): void;
  abstract resizeShape(origin: Coordinate, dimensions: Coordinate): void;

  handleToolMouseEvent(e: MouseEvent): void {
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

  setEqualDimensions(value: boolean): void {
    this.forceEqualDimensions = value;
    if (this.isActive) {
      this.updateCurrentCoord(this.mousePosition);
    }
  }

  drawPreviewArea(): void {
    this.drawingSurface.svg.nativeElement.appendChild(this.previewArea.svgNode);
  }

  removePreviewArea(): void {
    this.drawingSurface.svg.nativeElement.removeChild(this.previewArea.svgNode);
  }

  updateCurrentCoord(c: Coordinate): void {
    const delta = Coordinate.substract(c, this.initialMouseCoord);
    const previewDimensions = Coordinate.abs(delta);
    let origin = Coordinate.minXYCoord(c, this.initialMouseCoord);
    let dimensions = { ...previewDimensions } as Coordinate;

    this.previewArea.origin = origin;
    this.previewArea.width = previewDimensions.x;
    this.previewArea.height = previewDimensions.y;

    if (this.forceEqualDimensions) {
      const minDimension = Math.min(dimensions.x, dimensions.y);
      dimensions = new Coordinate(minDimension, minDimension);
    }

    if (delta.y < 0) {
      origin = new Coordinate(origin.x, origin.y + previewDimensions.y - dimensions.y);
    }

    if (delta.x < 0) {
      origin = new Coordinate(origin.x + previewDimensions.x - dimensions.x, origin.y);
    }

    this.resizeShape(origin, dimensions);
  }
}
