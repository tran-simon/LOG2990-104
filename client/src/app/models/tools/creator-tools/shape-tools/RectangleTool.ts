import { Coordinate } from 'src/app/models/Coordinate';
import { Color } from 'src/app/utils/color/color';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { Rectangle } from '../../../Rectangle';
import { ShapeTool } from './ShapeTool';

export class RectangleTool extends ShapeTool {
  private rectangle: Rectangle;

  get shape(): Rectangle {
    return this.rectangle;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  initShape(c: Coordinate) {
    this.rectangle = new Rectangle(c);
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
