import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-contour-type.enum';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

export class RectangleToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 10;

  minThickness: number;
  maxThickness: number;

  contourType: RectangleContourType;

  constructor(
    thickness: number = RectangleToolProperties.MIN_THICKNESS,
    contourType: RectangleContourType = RectangleContourType.FILLED_CONTOUR,
  ) {
    super(ToolType.Rectangle);

    this.strokeWidth = thickness;
    this.contourType = contourType;
    this.minThickness = RectangleToolProperties.MIN_THICKNESS;
    this.maxThickness = RectangleToolProperties.MAX_THICKNESS;
  }
}
