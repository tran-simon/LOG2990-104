import { EditorService } from '../../../../services/editor.service';
import { Color } from '../../../../utils/color/color';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Polygon } from '../../../shapes/polygon';
import { PolygonContourType, PolygonToolProperties } from '../../../tool-properties/polygon-tool-properties';
import { ToolType } from '../../tool-type';
import { ShapeTool } from './shape-tool';

export class PolygonTool extends ShapeTool<PolygonToolProperties> {
  shape: Polygon;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new PolygonToolProperties();
    this.type = ToolType.Polygon;
    this.setEqualDimensions(true);
  }

  protected updateProperties(): void {
    const { contourType, strokeWidth } = this.toolProperties;
    const { primaryColor, secondaryColor } = this.editorService.colorsService;

    this.shape.shapeProperties.strokeWidth = contourType === PolygonContourType.FILLED ? 0 : strokeWidth;
    this.shape.shapeProperties.fillColor = contourType === PolygonContourType.CONTOUR ? Color.TRANSPARENT : primaryColor;
    this.shape.shapeProperties.strokeColor = contourType === PolygonContourType.FILLED ? Color.TRANSPARENT : secondaryColor;
    this.shape.updateProperties();
  }

  createShape(): Polygon {
    return new Polygon(this.initialMouseCoord, this.toolProperties.nEdges);
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    this.shape.origin = origin;
    this.shape.width = dimensions.x;
    this.shape.height = dimensions.y;
    this.shape.updatePoints();
    this.shape.drawPoints();
  }
}
