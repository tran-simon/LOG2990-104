import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export enum RectangleContourType {
  FILLEDCONTOUR = 'Plein avec contour',
  FILLED = 'Plein',
  CONTOUR = 'Contour',
}

export class RectangleToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 10;

  contourType: RectangleContourType;

  constructor(
    thickness: number = RectangleToolProperties.MIN_THICKNESS,
    contourType: RectangleContourType = RectangleContourType.FILLEDCONTOUR,
  ) {
    super('Rectangle', RectangleToolProperties.MIN_THICKNESS, RectangleToolProperties.MAX_THICKNESS);

    this.thickness = thickness;
    this.contourType = contourType;
  }
}
