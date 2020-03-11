import { ToolProperties } from './tool-properties';

export class SprayToolProperties extends ToolProperties {
  static readonly MIN_SPRAY_RADIUS: number = 10;
  static readonly MAX_SPRAY_RADIUS: number = 100;
  static readonly MIN_SPRAY_FREQUENCY: number = 1;
  static readonly MAX_SPRAY_FREQUENCY: number = 100;

  minFrequency: number;
  maxFrequency: number;
  frequency: number;

  minThickness: number;
  maxThickness: number;
  radius: number;
  constructor(radius: number = SprayToolProperties.MIN_SPRAY_RADIUS, frequency: number = 1) {
    super();
    this.minThickness = SprayToolProperties.MIN_SPRAY_RADIUS;
    this.maxThickness = SprayToolProperties.MAX_SPRAY_RADIUS;
    this.minFrequency = SprayToolProperties.MIN_SPRAY_FREQUENCY;
    this.maxFrequency = SprayToolProperties.MAX_SPRAY_FREQUENCY;
    this.radius = radius;
    this.frequency = frequency;
  }
}
