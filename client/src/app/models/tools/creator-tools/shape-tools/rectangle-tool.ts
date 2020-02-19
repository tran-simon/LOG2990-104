import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class RectangleTool extends ShapeTool {
  toolProperties: RectangleToolProperties;

  private rectangle: Rectangle;

  get shape(): Rectangle {
    return this.rectangle;
  }

  constructor(public selectedColors: ColorsService) {
    super(ToolType.Rectangle);
    this.toolProperties = new RectangleToolProperties();
  }

  initShape(c: Coordinate, drawingSurfaceComponent: DrawingSurfaceComponent): void {
    this.rectangle = new Rectangle(c);

    switch (this.toolProperties.contourType) {
      case RectangleContourType.FILLEDCONTOUR:
        this.rectangle.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.rectangle.shapeProperties.fillColor = this.selectedColors.primaryColor;
        this.rectangle.shapeProperties.strokeColor = this.selectedColors.secondaryColor;
        break;
      case RectangleContourType.FILLED:
        this.rectangle.shapeProperties.strokeWidth = 0;
        this.rectangle.shapeProperties.fillColor = this.selectedColors.primaryColor;
        this.rectangle.shapeProperties.strokeColor = Color.TRANSPARENT;
        break;
      case RectangleContourType.CONTOUR:
        this.rectangle.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.rectangle.shapeProperties.fillColor = Color.TRANSPARENT;
        this.rectangle.shapeProperties.strokeColor = this.selectedColors.secondaryColor;
        break;
    }
    this.rectangle.updateProperties();
    this.drawShape(drawingSurfaceComponent);
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.rectangle.origin): void {
    this.rectangle.origin = origin;
    this.rectangle.width = dimensions.x;
    this.rectangle.height = dimensions.y;
  }
}
