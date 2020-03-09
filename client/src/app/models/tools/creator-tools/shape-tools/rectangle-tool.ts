import { Rectangle } from 'src/app/models/shapes/rectangle';
import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-contour-type';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { ToolType } from '../../tool-type';

export class RectangleTool extends ShapeTool<RectangleToolProperties> {
  shape: Rectangle;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new RectangleToolProperties();
    this.type = ToolType.Rectangle;
  }

  protected updateProperties(): void {
    switch (this.toolProperties.contourType) {
      case RectangleContourType.FILLED_CONTOUR:
        this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
        this.shape.shapeProperties.strokeColor = this.editorService.colorsService.secondaryColor;
        break;
      case RectangleContourType.FILLED:
        this.shape.shapeProperties.strokeWidth = 0;
        this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
        this.shape.shapeProperties.strokeColor = Color.TRANSPARENT;
        break;
      case RectangleContourType.CONTOUR:
        this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.shape.shapeProperties.fillColor = Color.TRANSPARENT;
        this.shape.shapeProperties.strokeColor = this.editorService.colorsService.secondaryColor;
        break;
    }
    this.shape.updateProperties();
  }

  createShape(): Rectangle {
    return new Rectangle(this.initialMouseCoord);
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    this.shape.origin = origin;
    this.shape.width = dimensions.x;
    this.shape.height = dimensions.y;
  }
}
