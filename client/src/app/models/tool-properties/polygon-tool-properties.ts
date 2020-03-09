import { Polygon } from 'src/app/models/shapes/polygon';
import { ShapeToolProperties } from 'src/app/models/tool-properties/shape-tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

export class PolygonToolProperties extends ShapeToolProperties {
  minPolyEdges: number = Polygon.MIN_POLY_EDGES;
  maxPolyEdges: number = Polygon.MAX_POLY_EDGES;
  nEdges: number;

  constructor(nEdge: number = Polygon.MIN_POLY_EDGES) {
    super(ToolType.Polygon);
    this.nEdges = nEdge;
  }
}
