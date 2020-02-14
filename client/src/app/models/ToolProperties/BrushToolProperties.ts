import { Color } from 'src/app/utils/color/color';
import { ToolProperties } from './ToolProperties';

export enum BrushTextureType {
  TEXTURE_1 = 'Texture 1',
  TEXTURE_2 = 'Texture 2',
  TEXTURE_3 = 'Texture 3',
  TEXTURE_4 = 'Texture 4',
  TEXTURE_5 = 'Texture 5',
}

export class BrushToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness = BrushToolProperties.MIN_THICKNESS;
  maxThickness = BrushToolProperties.MAX_THICKNESS;

  _thickness: number;
  texture: BrushTextureType;

  constructor(
    primaryColor: Color,
    secondaryColor: Color,
    thickness: number = BrushToolProperties.MIN_THICKNESS,
    texture: BrushTextureType = BrushTextureType.TEXTURE_1,
  ) {
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
