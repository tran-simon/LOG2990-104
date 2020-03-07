import { ToolType } from '../tools/tool-type';
import { ToolProperties } from './tool-properties';

export class SprayToolProperties extends ToolProperties {
  static readonly MIN_SPRAY_RADIUS = 10;
  static readonly MAX_SPRAY_RADIUS = 100;

  minThickness = SprayToolProperties.MIN_SPRAY_RADIUS;
  maxThickness = SprayToolProperties.MAX_SPRAY_RADIUS;

  frequency: number;
  radius: number;
  constructor(radius: number = SprayToolProperties.MIN_SPRAY_RADIUS, frequency: number = 20) {
    super(ToolType.Spray);
    this.radius = radius;
    this.frequency = frequency;
  }
}
