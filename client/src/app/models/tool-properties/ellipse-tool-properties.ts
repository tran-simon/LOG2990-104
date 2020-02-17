import { ToolProperties } from './tool-properties';

export enum EllipseContourType {
  FILLEDCONTOUR = 'Plein avec contour',
  FILLED = 'Plein',
  CONTOUR = 'Contour',
}

export class EllipseToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 10;

  minThickness: number = EllipseToolProperties.MIN_THICKNESS;
  maxThickness: number = EllipseToolProperties.MAX_THICKNESS;

  contourType: EllipseContourType;

  constructor(thickness: number = EllipseToolProperties.MIN_THICKNESS, contourType: EllipseContourType = EllipseContourType.FILLEDCONTOUR) {
    super('Ellipse');

    this.thickness = thickness;
    this.contourType = contourType;
  }
}
