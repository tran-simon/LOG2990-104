import { MAX_POLY_EDGES, MIN_POLY_EDGES } from '../shapes/polygon';
import { ToolProperties } from './tool-properties';

export enum PolygonContourType {
  FILLED_CONTOUR = 'Plein avec contour',
  FILLED = 'Plein',
  CONTOUR = 'Contour',
}

export class PolygonToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 10;

  minPolyEdges: number = MIN_POLY_EDGES;
  maxPolyEdges: number = MAX_POLY_EDGES;

  minThickness: number = PolygonToolProperties.MIN_THICKNESS;
  maxThickness: number = PolygonToolProperties.MAX_THICKNESS;

  contourType: PolygonContourType;
  nEdges: number;
  constructor(
    thickness: number = PolygonToolProperties.MIN_THICKNESS,
    contourType: PolygonContourType = PolygonContourType.FILLED_CONTOUR,
    nEdge: number = MIN_POLY_EDGES,
  ) {
    super();
    this.strokeWidth = thickness;
    this.contourType = contourType;
    this.nEdges = nEdge;
  }
}
