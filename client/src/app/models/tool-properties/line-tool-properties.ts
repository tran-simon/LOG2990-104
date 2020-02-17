import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { MathUtil } from '../../utils/math/math-util';

export enum LineJunctionType {
  POINTS = 'Avec points',
  EMPTY = 'Sans points',
}

export class LineToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;
  static readonly MIN_DIAMETER = 1;
  static readonly MAX_DIAMETER = 50;

  minThickness: number = LineToolProperties.MIN_THICKNESS;
  maxThickness: number = LineToolProperties.MAX_THICKNESS;
  private readonly _minDiameter = LineToolProperties.MIN_DIAMETER;
  private readonly _maxDiameter = LineToolProperties.MAX_DIAMETER;

  junctionType: LineJunctionType;
  private _junctionDiameter: number;

  constructor(
    thickness: number = LineToolProperties.MIN_THICKNESS,
    junctionType: LineJunctionType = LineJunctionType.POINTS,
    junctionDiameter: number = LineToolProperties.MIN_DIAMETER,
  ) {
    super('Line');

    this.thickness = thickness;
    this.junctionType = junctionType;
    this._junctionDiameter = junctionDiameter;
  }

  get junctionDiameter(): number {
    return this._junctionDiameter;
  }

  set junctionDiameter(diameter: number) {
    this._junctionDiameter = MathUtil.fit(diameter, this._minDiameter, this._maxDiameter);
  }

  get minDiameter(): number {
    return this._minDiameter;
  }

  get maxDiameter(): number {
    return this._maxDiameter;
  }
}
