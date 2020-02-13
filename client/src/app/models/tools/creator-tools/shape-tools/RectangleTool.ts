import { Coordinate } from 'src/app/models/Coordinate';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/ToolProperties/RectangleToolProperties';
import { Color } from 'src/app/utils/color/color';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { Rectangle } from '../../../Rectangle';
import { ShapeTool } from './ShapeTool';

export class RectangleTool extends ShapeTool {
  protected _toolProperties: RectangleToolProperties;
  private rectangle: Rectangle;

  get shape(): Rectangle {
    return this.rectangle;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  initShape(c: Coordinate) {
    this.rectangle = new Rectangle(c);

    switch (this._toolProperties.contourType) {
      case RectangleContourType.FILLEDCONTOUR:
        this.rectangle.properties.strokeWidth = this._toolProperties.thickness;
        this.rectangle.properties.fillColor = this._toolProperties.primaryColor;
        this.rectangle.properties.strokeColor = this._toolProperties.secondaryColor;
        break;
      case RectangleContourType.FILLED:
        this.rectangle.properties.strokeWidth = 0;
        this.rectangle.properties.fillColor = this._toolProperties.primaryColor;
        this.rectangle.properties.strokeColor = Color.TRANSPARENT;
        break;
      case RectangleContourType.CONTOUR:
        this.rectangle.properties.strokeWidth = this._toolProperties.thickness;
        this.rectangle.properties.fillColor = Color.TRANSPARENT;
        this.rectangle.properties.strokeColor = this._toolProperties.secondaryColor;
        break;
    }
    this.rectangle.updateProperties();
    this.drawShape();
  }

  resizeShape(origin: Coordinate, dimensions: Coordinate) {
    this.rectangle.origin = origin;
    this.rectangle.width = dimensions.x;
    this.rectangle.height = dimensions.y;
  }
}
