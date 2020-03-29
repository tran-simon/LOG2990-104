import { CreatorToolProperties } from 'src/app/models/tool-properties/creator-tool-properties/creator-tool-properties';

export class PenToolProperties extends CreatorToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 50;

  minThickness: number;
  maxThickness: number;

  constructor(thickness: number = PenToolProperties.MIN_THICKNESS) {
    super();

    this.strokeWidth = thickness;
    this.minThickness = PenToolProperties.MIN_THICKNESS;
    this.maxThickness = PenToolProperties.MAX_THICKNESS;
  }
}
