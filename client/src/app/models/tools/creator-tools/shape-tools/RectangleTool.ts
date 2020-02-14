import { Coordinate } from 'src/app/models/Coordinate';
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
    this.rectangle.updateProperties();
    this.drawShape();
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.rectangle.origin) {
    this.rectangle.origin = origin;
    this.rectangle.width = dimensions.x;
    this.rectangle.height = dimensions.y;
  }
}
