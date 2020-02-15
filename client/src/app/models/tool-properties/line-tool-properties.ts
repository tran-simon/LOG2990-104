import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export enum LineJunctionType {
  POINTS = 'Avec points',
  EMPTY = 'Sans points',
}

export class LineToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;
  static readonly MIN_DIAMETER = 1;
  static readonly MAX_DIAMETER = 50;

  minThickness = LineToolProperties.MIN_THICKNESS;
  maxThickness = LineToolProperties.MAX_THICKNESS;
  minDiameter = LineToolProperties.MIN_DIAMETER;
  maxDiameter = LineToolProperties.MAX_DIAMETER;

  thickness: number;
  junctionType: LineJunctionType;
  junctionDiameter: number;

  constructor(
    thickness: number = LineToolProperties.MIN_THICKNESS,
    junctionType: LineJunctionType = LineJunctionType.POINTS,
    junctionDiameter: number = LineToolProperties.MIN_DIAMETER,
  ) {
    super('Line');

    this.thickness = thickness;
    this.junctionType = junctionType;
    this.junctionDiameter = junctionDiameter;
  }
}