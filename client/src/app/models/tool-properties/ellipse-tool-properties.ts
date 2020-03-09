import { EllipseContourType } from 'src/app/models/tool-properties/ellipse-contour-type';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';

export class EllipseToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 10;

  minThickness: number = EllipseToolProperties.MIN_THICKNESS;
  maxThickness: number = EllipseToolProperties.MAX_THICKNESS;

  contourType: EllipseContourType;

  constructor(
    thickness: number = EllipseToolProperties.MIN_THICKNESS,
    contourType: EllipseContourType = EllipseContourType.FILLED_CONTOUR,
  ) {
    super(ToolType.Ellipse);

    this.strokeWidth = thickness;
    this.contourType = contourType;
  }
}
