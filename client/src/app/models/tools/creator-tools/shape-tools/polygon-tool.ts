import { EditorService } from '../../../../services/editor.service';
import { Color } from '../../../../utils/color/color';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Polygon } from '../../../shapes/polygon';
import { PolygonContourType, PolygonToolProperties } from '../../../tool-properties/polygon-tool-properties';
import { ShapeTool } from './shape-tool';

export class PolygonTool extends ShapeTool<PolygonToolProperties> {
  shape: Polygon;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new PolygonToolProperties();
    this.setEqualDimensions(true);
    this.keyboardEventHandler = {};
  }

  protected updateProperties(): void {
    switch (this.toolProperties.contourType) {
      case PolygonContourType.FILLEDCONTOUR:
        this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
        this.shape.shapeProperties.strokeColor = this.editorService.colorsService.secondaryColor;
        break;
      case PolygonContourType.FILLED:
        this.shape.shapeProperties.strokeWidth = 0;
        this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
        this.shape.shapeProperties.strokeColor = Color.TRANSPARENT;
        break;
      case PolygonContourType.CONTOUR:
        this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.shape.shapeProperties.fillColor = Color.TRANSPARENT;
        this.shape.shapeProperties.strokeColor = this.editorService.colorsService.secondaryColor;
        break;
    }
    this.shape.updateProperties();
  }
  createShape(): Polygon {
    return new Polygon(this.initialMouseCoord);
  }
  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    this.shape.origin = origin;
    this.shape.width = dimensions.x;
    this.shape.height = dimensions.y;
    this.shape.updatePoints();
    this.shape.drawPoints();
  }
}
