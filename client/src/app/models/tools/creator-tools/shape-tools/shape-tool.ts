import { Rectangle } from 'src/app/models/shapes/rectangle';
import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { ShapeToolProperties } from 'src/app/models/tool-properties/shape-tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class ShapeTool<T extends ShapeToolProperties> extends CreatorTool<T> {
  protected previewArea: Rectangle;
  private forceEqualDimensions: boolean;
  protected initialMouseCoord: Coordinate;

  protected constructor(editorService: EditorService) {
    super(editorService);

    this.previewArea = new Rectangle();
    this.forceEqualDimensions = false;
    this.keyboardListener.addEvents([
      [
        KeyboardListenerService.getIdentifier('Shift', false, true),
        () => {
          this.setEqualDimensions(true);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('Shift', false, false, 'keyup'),
        () => {
          this.setEqualDimensions(false);
        },
      ],
    ]);
  }

  abstract resizeShape(origin: Coordinate, dimensions: Coordinate): void;

  protected startShape(): void {
    this.initialMouseCoord = this.mousePosition;
    super.startShape();
    this.updateCurrentCoord(this.mousePosition);
    this.editorService.addPreviewShape(this.previewArea);
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (this.isActive) {
        this.updateCurrentCoord(this.mousePosition);
      }
    };

    this.handleMouseDown = () => {
      if (!this.isActive) {
        this.startShape();
      }
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.applyShape();
      }
    };
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
    this.previewArea.shapeProperties.primaryColor = Color.TRANSPARENT;
    this.previewArea.updateProperties();

    this.resizeShape(dimensions, origin);
  }

  protected updateProperties(): void {
    if (this.shape) {
      const { contourType, strokeWidth } = this.toolProperties;
      const { primaryColor, secondaryColor } = this.editorService.colorsService;

      this.shape.shapeProperties.strokeWidth = this.getStrokeWidth(contourType, strokeWidth);
      this.shape.shapeProperties.primaryColor = this.getFillColor(contourType, primaryColor);
      this.shape.shapeProperties.secondaryColor = this.getStrokeColor(contourType, secondaryColor);
      this.shape.updateProperties();
    }
  }

  protected getStrokeWidth(contourType: ContourType, width: number): number {
    return contourType === ContourType.FILLED ? 0 : width;
  }

  protected getFillColor(contourType: ContourType, color: Color): Color {
    return contourType === ContourType.CONTOUR ? Color.TRANSPARENT : color;
  }

  protected getStrokeColor(contourType: ContourType, color: Color): Color {
    return contourType === ContourType.FILLED ? Color.TRANSPARENT : color;
  }
}
