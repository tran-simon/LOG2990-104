import { Coordinate } from 'src/app/models/Coordinate';
import { RectangleToolProperties } from 'src/app/models/ToolProperties/RectangleToolProperties';
import { Color } from 'src/app/utils/color/color';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { Rectangle } from '../../../Rectangle';
import { ShapeTool } from './ShapeTool';

export class RectangleTool extends ShapeTool {
  protected _toolProperties: RectangleToolProperties;
  private rectangle: Rectangle;

  get shape() {
    return this.rectangle;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  initShape(c: Coordinate) {
    this.rectangle = new Rectangle(c);
    this.rectangle.properties.strokeWidth = this._toolProperties.thickness;
    this.rectangle.properties.fillColor = Color.RED;
    this.rectangle.updateProperties();
    this.drawShape();
  }

  resizeShape(origin: Coordinate, dimensions: Coordinate) {
    this.rectangle.origin = origin;
    this.rectangle.width = dimensions.x;
    this.rectangle.height = dimensions.y;
  }
}
