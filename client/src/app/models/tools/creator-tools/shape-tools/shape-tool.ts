import { Rectangle } from 'src/app/models/shapes/rectangle';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { ToolProperties } from '../../../tool-properties/tool-properties';

export abstract class ShapeTool<T = ToolProperties> extends CreatorTool<T> {
  protected previewArea: Rectangle;
  private forceEqualDimensions: boolean;
  protected initialMouseCoord: Coordinate;

  protected constructor(editorService: EditorService) {
    super(editorService);

    this.previewArea = new Rectangle();
    this.forceEqualDimensions = false;
    this.keyboardListener.addEvents([
      [
        KeyboardListener.getIdentifier('Shift', false, true),
        () => {
          this.setEqualDimensions(true);
          return false;
        },
      ],
      [
        KeyboardListener.getIdentifier('Shift', false, false, 'keyup'),
        () => {
          this.setEqualDimensions(false);
          return false;
        },
      ],
    ]);
  }

  abstract resizeShape(origin: Coordinate, dimensions: Coordinate): void;

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
    // todo - make a proper mouse manager
    const mouseCoord = new Coordinate(e.offsetX, e.offsetY);

    if (this.isActive) {
      switch (e.type) {
        case 'mouseup':
          this.applyShape();
          break;
        case 'mousemove':
          this.updateCurrentCoord(mouseCoord);
          break;
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.initialMouseCoord = mouseCoord;
      this.shape = this.createShape();
      this.updateProperties();
      this.addShape();

      this.updateCurrentCoord(mouseCoord);
      this.editorService.addPreviewShape(this.previewArea);
    }
  }

  setEqualDimensions(value: boolean): void {
    this.forceEqualDimensions = value;
    if (this.isActive) {
      this.updateCurrentCoord(this.mousePosition);
    }
  }

  updateCurrentCoord(c: Coordinate): void {
    const delta = Coordinate.substract(c, this.initialMouseCoord);
    const previewDimensions = Coordinate.abs(delta);
    let dimensions = new Coordinate(previewDimensions.x, previewDimensions.y);
    const previewOrigin = Coordinate.minXYCoord(c, this.initialMouseCoord);
    let origin = new Coordinate(previewOrigin.x, previewOrigin.y);

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

    this.previewArea.origin = previewOrigin;
    this.previewArea.width = previewDimensions.x;
    this.previewArea.height = previewDimensions.y;
    this.previewArea.shapeProperties.fillColor = Color.TRANSPARENT;
    this.previewArea.updateProperties();

    this.resizeShape(dimensions, origin);
  }
}
