import { ToolType } from '../tools/tool-type';
import { ToolProperties } from './tool-properties';

export class SprayToolProperties extends ToolProperties {
  static readonly MIN_SPRAY_RADIUS = 1;
  static readonly MAX_SPRAY_RADIUS = 100;

  minThickness = SprayToolProperties.MIN_SPRAY_RADIUS;
  maxThickness = SprayToolProperties.MAX_SPRAY_RADIUS;
  frequency: number;
  constructor(thickness: number = SprayToolProperties.MIN_SPRAY_RADIUS, frequency: number = 100) {
    super(ToolType.Spray);
    this.strokeWidth = thickness;
    this.frequency = frequency;
  }
}
