import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-contour-type';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';

export class RectangleToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 10;

  minThickness: number = RectangleToolProperties.MIN_THICKNESS;
  maxThickness: number = RectangleToolProperties.MAX_THICKNESS;

  contourType: RectangleContourType;

  constructor(
    thickness: number = RectangleToolProperties.MIN_THICKNESS,
    contourType: RectangleContourType = RectangleContourType.FILLED_CONTOUR,
  ) {
    super(ToolType.Rectangle);

    this.strokeWidth = thickness;
    this.contourType = contourType;
  }
}
