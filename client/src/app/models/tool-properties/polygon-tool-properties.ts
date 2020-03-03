import { MAX_POLY_EDGES, MIN_POLY_EDGES } from '../shapes/polygon';
import { ToolType } from '../tools/tool-type';
import { ToolProperties } from './tool-properties';

export enum PolygonContourType {
  FILLEDCONTOUR = 'Plein avec contour',
  FILLED = 'Plein',
  CONTOUR = 'Contour',
}

export class PolygonToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 10;

  minPolyEdges = MIN_POLY_EDGES;
  maxPolyEdges = MAX_POLY_EDGES;

  minThickness = PolygonToolProperties.MIN_THICKNESS;
  maxThickness = PolygonToolProperties.MAX_THICKNESS;

  contourType: PolygonContourType;
  nEdges: number;
  constructor(
    thickness: number = PolygonToolProperties.MIN_THICKNESS,
    contourType: PolygonContourType = PolygonContourType.FILLEDCONTOUR,
    nEdge: number = MIN_POLY_EDGES,
  ) {
    super(ToolType.Polygon);
    this.strokeWidth = thickness;
    this.contourType = contourType;
    this.nEdges = nEdge;
  }
}
