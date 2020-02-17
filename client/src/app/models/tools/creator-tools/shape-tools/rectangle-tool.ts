import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class RectangleTool extends ShapeTool {
  protected _toolProperties: RectangleToolProperties;
  private rectangle: Rectangle;

  get shape(): Rectangle {
    return this.rectangle;
  }

  constructor(drawingSurface: DrawingSurfaceComponent, private selectedColors: SelectedColorsService) {
    super(drawingSurface);
  }

  initShape(c: Coordinate): void {
    this.rectangle = new Rectangle(c);

    switch (this._toolProperties.contourType) {
      case RectangleContourType.FILLEDCONTOUR:
        this.rectangle.properties.strokeWidth = this._toolProperties.thickness;
        this.rectangle.properties.fillColor = this.selectedColors.primaryColor;
        this.rectangle.properties.strokeColor = this.selectedColors.secondaryColor;
        break;
      case RectangleContourType.FILLED:
        this.rectangle.properties.strokeWidth = 0;
        this.rectangle.properties.fillColor = this.selectedColors.primaryColor;
        this.rectangle.properties.strokeColor = Color.TRANSPARENT;
        break;
      case RectangleContourType.CONTOUR:
        this.rectangle.properties.strokeWidth = this._toolProperties.thickness;
        this.rectangle.properties.fillColor = Color.TRANSPARENT;
        this.rectangle.properties.strokeColor = this.selectedColors.secondaryColor;
        break;
    }
    this.rectangle.updateProperties();
    this.drawShape();
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.rectangle.origin): void {
    this.rectangle.origin = origin;
    this.rectangle.width = dimensions.x;
    this.rectangle.height = dimensions.y;
  }
}
