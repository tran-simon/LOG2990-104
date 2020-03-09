import { ContourType } from 'src/app/models/tool-properties/contour-type';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';

export abstract class ShapeToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 10;

  minThickness: number = ShapeToolProperties.MIN_THICKNESS;
  maxThickness: number = ShapeToolProperties.MAX_THICKNESS;
  contourType: ContourType;

  protected constructor(type: ToolType,
                        contourType: ContourType = ContourType.FILLED_CONTOUR,
                        minThickness: number = ShapeToolProperties.MIN_THICKNESS,
                        maxThickness: number = ShapeToolProperties.MAX_THICKNESS,
              ) {
    super(type);
    this.minThickness = minThickness;
    this.maxThickness = maxThickness;
    this.contourType = contourType;
    this.strokeWidth = minThickness;
  }
}
