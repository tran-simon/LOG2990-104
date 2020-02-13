import { Color } from 'src/app/utils/color/color';
import { ToolProperties } from './ToolProperties';

export class BrushToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness = BrushToolProperties.MIN_THICKNESS;
  maxThickness = BrushToolProperties.MAX_THICKNESS;

  _thickness: number;
  texture: any;

  constructor(primaryColor: Color, secondaryColor: Color, thickness: number = BrushToolProperties.MIN_THICKNESS, texture: any = 'TODO') {
    super('Brush', primaryColor, secondaryColor);

    this.thickness = thickness;
    this.texture = texture;
  }

  get thickness(): number {
    return this._thickness;
  }

  set thickness(thickness: number) {
    if (thickness < this.minThickness) {
      this._thickness = this.minThickness;
    } else if (thickness > this.maxThickness) {
      this._thickness = this.maxThickness;
    } else {
      this._thickness = thickness;
    }
  }
}
