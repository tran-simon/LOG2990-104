import { MathUtil } from 'src/app/utils/math/math-util';

export abstract class ToolProperties {
  toolName: string;

  private _thickness: number;
  private readonly _minThickness: number;
  private readonly _maxThickness: number;

  protected constructor(toolName: string, minThickness: number, maxThickness: number) {
    this.toolName = toolName;

    this._minThickness = minThickness;
    this._maxThickness = maxThickness;
  }

  get thickness(): number {
    return this._thickness;
  }

  set thickness(thickness: number) {
    this._thickness = MathUtil.fit(thickness, this._minThickness, this._maxThickness);
  }

  get maxThickness(): number {
    return this._maxThickness;
  }

  get minThickness(): number {
    return this._minThickness;
  }
}
