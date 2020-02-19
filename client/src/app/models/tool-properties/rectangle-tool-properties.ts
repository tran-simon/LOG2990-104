import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export enum RectangleContourType {
  FILLEDCONTOUR = 'Plein avec contour',
  FILLED = 'Plein',
  CONTOUR = 'Contour',
}

export class RectangleToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 10;

  minThickness: number = RectangleToolProperties.MIN_THICKNESS;
  maxThickness: number = RectangleToolProperties.MAX_THICKNESS;

  contourType: RectangleContourType;

  constructor(
    thickness: number = RectangleToolProperties.MIN_THICKNESS,
    contourType: RectangleContourType = RectangleContourType.FILLEDCONTOUR,
  ) {
    super('Rectangle');

    this.strokeWidth = thickness;
    this.contourType = contourType;
  }
}
