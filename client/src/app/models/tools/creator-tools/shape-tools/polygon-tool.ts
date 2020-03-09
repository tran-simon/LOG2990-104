import { EditorService } from '../../../../services/editor.service';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Polygon } from '../../../shapes/polygon';
import { PolygonToolProperties } from '../../../tool-properties/polygon-tool-properties';
import { ToolType } from '../../tool-type.enum';
import { ShapeTool } from './shape-tool';

export class PolygonTool extends ShapeTool<PolygonToolProperties> {
  shape: Polygon;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new PolygonToolProperties();
    this.type = ToolType.Polygon;
    this.setEqualDimensions(true);
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
