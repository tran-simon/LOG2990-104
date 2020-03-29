import { CreatorToolProperties } from 'src/app/models/tool-properties/creator-tool-properties/creator-tool-properties';
import { LineJunctionType } from 'src/app/models/tool-properties/creator-tool-properties/line-junction-type.enum';
import { MathUtil } from 'src/app/utils/math/math-util';

export class LineToolProperties extends CreatorToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 50;
  static readonly MIN_DIAMETER: number = 1;
  static readonly MAX_DIAMETER: number = 50;

  minThickness: number;
  maxThickness: number;
  readonly minDiameter: number;
  readonly maxDiameter: number;

  junctionType: LineJunctionType;
  private _junctionDiameter: number;

  constructor(
    thickness: number = LineToolProperties.MIN_THICKNESS,
    junctionType: LineJunctionType = LineJunctionType.POINTS,
    junctionDiameter: number = LineToolProperties.MIN_DIAMETER,
  ) {
    super();

    this.strokeWidth = thickness;
    this.junctionType = junctionType;
    this._junctionDiameter = junctionDiameter;
    this.minThickness = LineToolProperties.MIN_THICKNESS;
    this.maxThickness = LineToolProperties.MAX_THICKNESS;
    this.minDiameter = LineToolProperties.MIN_DIAMETER;
    this.maxDiameter = LineToolProperties.MAX_DIAMETER;
  }

  get junctionDiameter(): number {
    return this._junctionDiameter;
  }

  set junctionDiameter(diameter: number) {
    this._junctionDiameter = MathUtil.fit(diameter, this.minDiameter, this.maxDiameter);
  }
}
