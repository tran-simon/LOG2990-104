import { ToolProperties } from './ToolProperties';

export enum RectangleContourType {
  FILLEDCONTOUR = 'Plein avec contour',
  FILLED = 'Plein',
  CONTOUR = 'Contour',
}

export class RectangleToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 10;

  minThickness = RectangleToolProperties.MIN_THICKNESS;
  maxThickness = RectangleToolProperties.MAX_THICKNESS;

  thickness: number;
  contourType: RectangleContourType;

  constructor(
    thickness: number = RectangleToolProperties.MIN_THICKNESS,
    contourType: RectangleContourType = RectangleContourType.FILLEDCONTOUR,
  ) {
    super('Rectangle');

    this.thickness = thickness;
    this.contourType = contourType;
  }
}
