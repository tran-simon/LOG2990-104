import { ToolType } from '../tools/tool-type';
import { ToolProperties } from './tool-properties';

export class SprayToolProperties extends ToolProperties {
  static readonly MIN_SPRAY_RADIUS: number = 10;
  static readonly MAX_SPRAY_RADIUS: number = 100;

  minThickness: number;
  maxThickness: number;

  frequency: number;
  radius: number;
  constructor(radius: number = SprayToolProperties.MIN_SPRAY_RADIUS, frequency: number = 1) {
    super(ToolType.Spray);
    this.minThickness = SprayToolProperties.MIN_SPRAY_RADIUS;
    this.maxThickness = SprayToolProperties.MAX_SPRAY_RADIUS;
    this.radius = radius;
    this.frequency = frequency;
  }
}
